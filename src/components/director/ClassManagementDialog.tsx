import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { School, Upload, Search, Tags } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from 'xlsx';

export function ClassManagementDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    capacity: "",
    room: "",
    teacherId: "",
    type: "regular",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data: teachers } = useQuery({
    queryKey: ['available-teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, tags')
        .eq('role', 'teacher');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: students } = useQuery({
    queryKey: ['available-students', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('profiles')
        .select('id, first_name, last_name, tags')
        .eq('role', 'student');

      if (searchTerm) {
        query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Process student data and find matching profiles
        const studentIds = await Promise.all(
          jsonData.map(async (row: any) => {
            const { data } = await supabase
              .from('profiles')
              .select('id')
              .eq('first_name', row.first_name)
              .eq('last_name', row.last_name)
              .single();
            return data?.id;
          })
        );

        setSelectedStudents(studentIds.filter(Boolean));
        toast({
          title: "Success",
          description: `${studentIds.length} students imported successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process Excel file",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create class
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .insert({
          name: formData.name,
          level: formData.level,
          capacity: parseInt(formData.capacity),
          room: formData.room,
          teacher_id: formData.teacherId,
          type: formData.type,
        })
        .select()
        .single();

      if (classError) throw classError;

      // Assign students to class
      if (selectedStudents.length > 0) {
        const { error: assignError } = await supabase
          .from('students_classes')
          .insert(
            selectedStudents.map(studentId => ({
              student_id: studentId,
              class_id: classData.id
            }))
          );

        if (assignError) throw assignError;
      }

      // Create notifications for teacher and students
      const notifications = [
        {
          user_id: formData.teacherId,
          title: "New Class Assignment",
          message: `You have been assigned to teach ${formData.name}`,
          type: "info"
        },
        ...selectedStudents.map(studentId => ({
          user_id: studentId,
          title: "Class Assignment",
          message: `You have been assigned to ${formData.name}`,
          type: "info"
        }))
      ];

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert(notifications);

      if (notificationError) throw notificationError;

      toast({
        title: "Success",
        description: "Class created and students assigned successfully",
      });
      setIsOpen(false);
      setFormData({
        name: "",
        level: "",
        capacity: "",
        room: "",
        teacherId: "",
        type: "regular",
      });
      setSelectedStudents([]);
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
          <School className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="teacher">Teacher</Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => setFormData({ ...formData, teacherId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers?.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.first_name} {teacher.last_name}
                    {teacher.tags && (
                      <span className="ml-2 text-sm text-gray-500">
                        {teacher.tags.join(", ")}
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Class Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="special">Special</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assign Students</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search students by name or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                  {students?.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                    >
                      <div>
                        {student.first_name} {student.last_name}
                        {student.tags && (
                          <span className="ml-2 text-sm text-gray-500">
                            {student.tags.join(", ")}
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant={selectedStudents.includes(student.id) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedStudents(prev =>
                            prev.includes(student.id)
                              ? prev.filter(id => id !== student.id)
                              : [...prev, student.id]
                          );
                        }}
                      >
                        {selectedStudents.includes(student.id) ? "Selected" : "Select"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-md">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Excel</span>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Class"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}