"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState<any>();

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const handleClose = () => {
    setIsOpen(false);
    state.success && router.refresh();
  };

  return (
    <>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Update
      </span>
      {isOpen && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* Close button */}
            <div
              className="absolute right-5 top-3 bg-gray-500 hover:bg-gray-600 flex items-center justify-center text-xs text-white rounded-xl p-2 w-6 h-6 cursor-pointer"
              onClick={() => handleClose()}
            >
              X
            </div>
            {/* Title */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the Navbar Profile to change the avatar or username.
            </div>
            {/* Cover Picture */}
            <CldUploadWidget
              uploadPreset="iisocialize_storage"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={
                          cover?.secure_url
                            ? cover?.secure_url
                            : user?.cover
                            ? user?.cover
                            : "/noCover.png"
                        }
                        alt=""
                        width={780}
                        height={192}
                        className="w-screen h-48 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* Form data */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user?.firstName || "Enter your first name"}
                  name="firstName"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder={user?.lastName || "Enter your last name"}
                  name="lastName"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={
                    user?.description || "Enter the description about you"
                  }
                  name="description"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user?.city || "Enter the city"}
                  name="city"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user?.school || "Enter your school"}
                  name="school"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user?.work || "Enter your current work"}
                  name="work"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user?.website || "Enter your website"}
                  name="website"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 p-2 mt-2 rounded-md text-white">
              Update
            </button>
            {state.success && (
              <div className="text-green-500 text-xs">Profile updated!</div>
            )}
            {state.error && (
              <div className="text-red-500 text-xs">Something went wrong!</div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
