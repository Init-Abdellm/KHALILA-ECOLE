import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import { ID } from "appwrite";

export function CourseManagementDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classId: "",
    scheduleDay: "",
    scheduleTime: "",
  });

  const { data: classes } = useQuery({
    queryKey: ['teacher-classes', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await db.getClasses();
      if (error) throw error;
      return data;
    },
    enabled: !!profile?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create course
      const { data: course, error: courseError } = await db.getCourses([
        Query.equal('name', formData.name),
        Query.equal('class_id', formData.classId)
      ]);

      if (courseError) throw courseError;
      if (course && course.length > 0) {
        throw new Error('A course with this name already exists for this class');
      }

      const { data: newCourse, error: createError } = await db.createCourse({
        name: formData.name,
        description: formData.description,
        class_id: formData.classId,
        teacher_id: profile?.id || '',
        schedule_day: formData.scheduleDay.toLowerCase(),
        schedule_time: formData.scheduleTime,
      });

      if (createError) throw createError;

      // Get affected students
      const { data: students } = await db.getStudentClasses([
        Query.equal('class_id', formData.classId)
      ]);

      // Create notifications for affected students
      if (students && students.length > 0) {
        await Promise.all(students.map(student => 
          db.createNotification({
            user_id: student.student_id,
            title: "New Course Added",
            message: `A new course "${formData.name}" has been added to your schedule on ${formData.scheduleDay}s at ${formData.scheduleTime}`,
            type: "info",
            read: false
          })
        ));
      }

      toast({
        title: "Success",
        description: "Course created successfully",
      });
      setIsOpen(false);
      setFormData({
        name: "",
        description: "",
        classId: "",
        scheduleDay: "",
        scheduleTime: "",
      });
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
          <BookOpen className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
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
          <div>
            <Label htmlFor="scheduleDay">Day</Label>
            <Select
              value={formData.scheduleDay}
              onValueChange={(value) => setFormData({ ...formData, scheduleDay: value })}
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
            <Label htmlFor="scheduleTime">Time</Label>
            <Input
              id="scheduleTime"
              type="time"
              value={formData.scheduleTime}
              onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}