"use client";
import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserValidation } from "@/lib/validations/user";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { isBase64Image, useUploadThing } from "@/lib/utils";
import { updateUser } from "@/lib/actions/userAction";

interface userData {
  id: string;
  objectId: string | any;
  username: string | any;
  name: string | any;
  bio: string | any;
  image: string | any;
}
export default function OnboardForm({ user }: { user: userData }) {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user.image || "",
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });
  const { startUpload } = useUploadThing("media");

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      console.log(imgRes, "immmg");
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-zinc-900 mt-6 p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 ">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_icon"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile_icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="cursor-pointer border-none bg-transparent outline-none       file:text-blue-600 "
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-black outline-none border-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-black outline-none border-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={15}
                    className="bg-black outline-none border-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-purple-500 text-black rounded-xl w-full hover:bg-purple-500"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
