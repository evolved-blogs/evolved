"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Upload } from "@src/components/common/upload";
import { uploadFile } from "@src/services/upload/upload";
import { useForm } from "react-hook-form";
import Input from "@src/components/atoms/input/Input";
import { updateProfile } from "@src/services/profile/profile";
import { useRouter } from "next/navigation";
import { Urls } from "@src/enum";
const Profile = () => {
  const [step, setStep] = useState(1); // Step number
  const router = useRouter();
  const [progress, setProgress] = useState(33);
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress(progress + 33);
    } else {
      alert("🎉 Form Submitted Successfully!");
    }
  };

  const onFileChange = (file: File | null) => {
    setFile(file || null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (!file) {
        alert("Please upload a thumbnail for the blog");
        return;
      }
      const { fileUrl } = await uploadFile({ file });

      const formData = { ...data, avatar: fileUrl };

      const response = await updateProfile({
        ...formData,
      });
      if (response) {
        router.push(Urls.Home);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          {step === 1
            ? "🚀 Let's Get Started!"
            : step === 2
              ? "Wanna say anything?"
              : "📸 Hey Handsome"}
        </h2>
        <p className="mb-6 text-center text-gray-500">
          {step === 1
            ? "Fill in your details to continue."
            : step === 2
              ? "Tell us about yourself."
              : "We wanna see you."}
        </p>

        <div className="space-y-4">
          {step === 1 && (
            <>
              <Input
                control={control}
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
                isRequired
              />
              <Input
                control={control}
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                isRequired
              />
            </>
          )}
          {step === 2 && (
            <Input
              control={control}
              name="bio"
              label="Bio"
              placeholder="Enter your bio"
              isRequired
            />
          )}
          {step === 3 && (
            <div className="flex flex-col items-center">
              <Upload onFileChange={onFileChange} />
            </div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white font-semibold shadow-md transition-all hover:shadow-lg hover:brightness-110"
            >
              Next ➜
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white font-semibold shadow-md transition-all hover:shadow-lg hover:brightness-110"
            >
              Submit 🚀
            </button>
          )}
          {/* <button
            onClick={handleNext}
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white font-semibold shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            {step === 1 ? "Next ➜" : <div> Are you ready to Launch 🚀 </div>}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
