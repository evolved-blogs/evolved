"use client";

import Input from "@src/components/atoms/input/Input";
import { getProfile } from "@src/services/profile/profile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { getBlogByUserId } from "@src/services";
import { BlogCard } from "@src/components/common/blog-card";
import { useRouter } from "next/navigation";
import Header from "@src/components/common/header/Header";

type Profile = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
};

const ProfileView = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [blogs, setBlogs] = useState([]);
  const { control, setValue } = useForm();
  const { firstName, lastName, avatar } = profile || {};
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      setProfile(response);

      if (response) {
        setValue("firstName", response.firstName);
        setValue("lastName", response.lastName);
        setValue("bio", response.bio);
      }
    };

    const fetchBlogs = async () => {
      const blogs = await getBlogByUserId();
      setBlogs(blogs);
    };

    fetchBlogs();
    fetchProfile();
  }, [setValue]);

  return (
    <>
      <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mt-40">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 relative rounded-full overflow-hidden shadow-lg border-4 border-indigo-500">
                {avatar && (
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
                {firstName} {lastName}
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input control={control} name="firstName" label="First Name" />
              <Input control={control} name="lastName" label="Last Name" />
              <div className="md:col-span-2">
                <Input control={control} name="bio" label="Bio" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full max-w-4xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">My Blogs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => {
              const { thumbnail, author, description, slug, status, title } =
                blog || {};
              const { firstName, avatar } = author || {};

              const handleOnBlogClick = () => router.push(`/blogs/${slug}`);
              return (
                <BlogCard
                  key={blog._id}
                  title={title}
                  description={description}
                  cardImage={thumbnail}
                  badge={status}
                  authorName={firstName}
                  footerAvatar={avatar}
                  onClick={handleOnBlogClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
