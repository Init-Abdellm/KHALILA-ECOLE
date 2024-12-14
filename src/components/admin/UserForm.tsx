import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { TagsInput } from "./TagsInput";

interface UserFormData {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  password?: string;
  tags?: string[];
}

interface UserFormProps {
  data: UserFormData;
  onChange: (data: UserFormData) => void;
  mode: 'create' | 'edit';
}

export function UserForm({ data, onChange, mode }: UserFormProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 py-4">
      {mode === 'create' && (
        <div>
          <Label htmlFor="email">{t('admin.users.form.email')}</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            required={mode === 'create'}
          />
        </div>
      )}
      <div>
        <Label htmlFor="firstName">{t('admin.users.form.firstName')}</Label>
        <Input
          id="firstName"
          value={data.firstName}
          onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">{t('admin.users.form.lastName')}</Label>
        <Input
          id="lastName"
          value={data.lastName}
          onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">{t('admin.users.form.role')}</Label>
        <Select
          value={data.role}
          onValueChange={(value) => onChange({ ...data, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('admin.users.form.role')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="director">Director</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="phone">{t('admin.users.form.phone')}</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </div>
      {data.role === 'teacher' && (
        <div>
          <Label>{t('admin.users.form.tags')}</Label>
          <TagsInput
            value={data.tags || []}
            onChange={(tags) => onChange({ ...data, tags })}
          />
        </div>
      )}
      {mode === 'edit' && (
        <div>
          <Label htmlFor="password">{t('admin.users.form.password')}</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}