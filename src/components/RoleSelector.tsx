import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const roles = [
  { id: "admin", label: "Admin Dashboard", path: "/admin" },
  { id: "director", label: "Director Dashboard", path: "/director" },
  { id: "teacher", label: "Teacher Dashboard", path: "/teacher" },
  { id: "student", label: "Student Dashboard", path: "/student" },
];

const RoleSelector = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    const selectedRolePath = roles.find((r) => r.id === role)?.path || "/";
    navigate(selectedRolePath);
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-4">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-primary mb-2">
            {t("roleSelector.title", "Development Mode - Role Selector")}
          </h2>
          <p className="text-sm text-gray-500">
            {t(
              "roleSelector.description",
              "Switch between different dashboard views"
            )}
          </p>
        </div>
        <Select value={selectedRole} onValueChange={handleRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-center text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
          {t(
            "roleSelector.warning",
            "⚠️ This selector is for development purposes only"
          )}
        </div>
      </div>
    </Card>
  );
};

export default RoleSelector; 