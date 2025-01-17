import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";

interface StudentEntry {
  student?: {
    $id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  class: {
    name: string;
  };
}

const Students = () => {
  const { profile } = useProfile();

  const { data: students, isLoading } = useQuery<StudentEntry[]>({
    queryKey: ['teacher-students', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      // Get teacher's classes
      const { data: classes, error: classesError } = await db.getClasses();
      const teacherClasses = classes?.filter(c => c.teacher_id === profile.id) || [];

      if (classesError) {
        console.error('Error fetching classes:', classesError);
        throw classesError;
      }

      const classIds = teacherClasses.map(c => c.$id);

      // Get students for each class
      const studentsData = await Promise.all(
        classIds.map(async (classId) => {
          const { data: students } = await db.getStudentClasses([
            Query.equal('class_id', classId)
          ]);
          return students || [];
        })
      );

      // Flatten and get unique student IDs
      const studentIds = [...new Set(
        studentsData.flat().map(entry => entry.student_id)
      )];

      // Get student profiles
      const studentProfiles = await Promise.all(
        studentIds.map(id => db.getProfile(id))
      );

      // Create a map of class names
      const classesMap = new Map(
        classes?.map(c => [c.$id, c.name]) || []
      );

      // Combine all data
      return studentsData.flat().map(entry => ({
        student: studentProfiles.find(({ data }) => data?.user_id === entry.student_id)?.data,
        class: { name: classesMap.get(entry.class_id) || '' }
      })).filter(entry => entry.student) as {
        student: { $id: string; first_name: string; last_name: string; email: string; phone: string };
        class: { name: string };
      }[];
    },
    enabled: !!profile?.id,
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Élèves" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes Élèves" role="Professeur">
      <Card className="w-full">
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((entry) => (
                  <TableRow key={entry.student?.$id}>
                    <TableCell className="font-medium">
                      {entry.student?.first_name} {entry.student?.last_name}
                    </TableCell>
                    <TableCell>{entry.class.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{entry.student?.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{entry.student?.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Students;