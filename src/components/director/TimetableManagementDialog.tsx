import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { databases } from "@/lib/appwrite";
import { Calendar, Clock, Plus, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ID, Query } from "appwrite";

export function TimetableManagementDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classId: "",
  });
  const [entries, setEntries] = useState([{
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    courseId: "",
    room: "",
  }]);

  const { data: classes } = useQuery({
    queryKey: ['available-classes'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'classes'
      );
      return response.documents;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ['available-courses'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'courses'
      );
      return response.documents;
    },
  });

  const addEntry = () => {
    setEntries([...entries, {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      courseId: "",
      room: "",
    }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create timetable template
      const template = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'timetable_templates',
        ID.unique(),
        {
          name: formData.name,
          description: formData.description,
        }
      );

      // Create timetable entries
      await Promise.all(
        entries.map(entry =>
          databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            'timetable_entries',
            ID.unique(),
            {
              template_id: template.$id,
              class_id: formData.classId,
              course_id: entry.courseId,
              day_of_week: entry.dayOfWeek,
              start_time: entry.startTime,
              end_time: entry.endTime,
              room: entry.room,
            }
          )
        )
      );

      // Get affected users
      const studentsResponse = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'students_classes',
        [Query.equal('class_id', formData.classId)]
      );

      const classResponse = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'classes',
        formData.classId
      );

      // Create notifications
      const notifications = [
        {
          user_id: classResponse.teacher_id,
          title: "New Timetable",
          message: `A new timetable has been created for your class: ${formData.name}`,
          type: "info"
        },
        ...studentsResponse.documents.map(({ student_id }) => ({
          user_id: student_id,
          title: "New Timetable",
          message: `A new timetable has been created for your class: ${formData.name}`,
          type: "info"
        }))
      ];

      await Promise.all(
        notifications.map(notification =>
          databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            'notifications',
            ID.unique(),
            notification
          )
        )
      );

      toast({
        title: "Success",
        description: "Timetable created successfully",
      });
      setIsOpen(false);
      setFormData({
        name: "",
        description: "",
        classId: "",
      });
      setEntries([{
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        courseId: "",
        room: "",
      }]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Create Timetable
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Timetable</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Timetable Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="class">Class</Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => setFormData({ ...formData, classId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes?.map((class_) => (
                  <SelectItem key={class_.$id} value={class_.$id}>
                    {class_.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Schedule Entries</Label>
              <Button type="button" variant="outline" onClick={addEntry}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium">Entry {index + 1}</h4>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day</Label>
                    <Select
                      value={entry.dayOfWeek}
                      onValueChange={(value) => updateEntry(index, "dayOfWeek", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Course</Label>
                    <Select
                      value={entry.courseId}
                      onValueChange={(value) => updateEntry(index, "courseId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses?.map((course) => (
                          <SelectItem key={course.$id} value={course.$id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={entry.startTime}
                      onChange={(e) => updateEntry(index, "startTime", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={entry.endTime}
                      onChange={(e) => updateEntry(index, "endTime", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Room</Label>
                    <Input
                      value={entry.room}
                      onChange={(e) => updateEntry(index, "room", e.target.value)}
                      placeholder="Room number or name"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Timetable"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}