import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateMedicalStatus } from "@/hooks/features/use-update-medical-status";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  comments: z.string().min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

export const RejectionAlert = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const open = searchParams.get("reject_dialog_doctor");
  const { mutate, isPending } = useUpdateMedicalStatus();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });

  return (
    <AlertDialog
      open={open === "true"}
      onOpenChange={(state) => !state && router.push(pathname)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You want to reject this submission?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please fill the comments bellow
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            id="update-profile"
            onSubmit={form.handleSubmit((data) =>
              mutate(
                { status: "REJECT", ...data },
                { onSuccess: () => closeRef.current?.click() }
              )
            )}
          >
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Comments" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            form="update-profile"
            disabled={isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
