import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import TextField from "@/components/forms/TextField";
import SelectField from "@/components/forms/SelectField";
import { currentAdmin } from "@/services/mockAdminData";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  password: z.string().optional(),
});

export default function SettingsPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentAdmin.name,
      email: currentAdmin.email,
      phone: currentAdmin.phone,
      location: currentAdmin.location,
      password: "",
    },
  });

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
        <h2 className="text-h4 font-semibold text-text-primary">Settings</h2>
        <p className="mt-1 text-body text-text-secondary">
          Update your profile and change your password.
        </p>
      </div>

      <form
        className="grid gap-6 lg:grid-cols-2"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-4">
          <h3 className="text-h5 font-semibold text-text-primary">Profile</h3>
          <TextField
            label="Full name"
            id="settings-name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />
          <TextField
            label="Email"
            id="settings-email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
          <TextField
            label="Phone"
            id="settings-phone"
            {...form.register("phone")}
          />
          <TextField
            label="Location"
            id="settings-location"
            {...form.register("location")}
          />
          <Button type="submit">Save profile</Button>
        </div>

        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-4">
          <h3 className="text-h5 font-semibold text-text-primary">Security</h3>
          <TextField
            label="Current password"
            id="settings-current"
            type="password"
          />
          <TextField
            label="New password"
            id="settings-password"
            type="password"
            {...form.register("password")}
          />
          <SelectField
            label="Account status"
            id="settings-status"
            defaultValue="Active"
          >
            <option>Active</option>
            <option>Suspended</option>
          </SelectField>
          <Button variant="secondary" type="submit">
            Change password
          </Button>
        </div>
      </form>
    </div>
  );
}
