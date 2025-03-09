"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqProfileModal from "@/components/FaqProfileModal";

interface ProfileType {
  id: number;
  name: string;
  photo: string;
  position: string;
  department: string;
  contacts: string;
  biography: string;
  birth_date: string;
  education: string;
}

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // Unwrap the params promise using React.use()
  const { id } = use(params);
  const profileId = Number(id);

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfileById(profileId);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 items-start">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={250}
            height={250}
            className="rounded-3xl border-2"
          />
          <div className="flex flex-wrap w-full items-start justify-between">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-2xl">{profile.name}</h3>
              <p>{profile.position || "Не указано"}</p>
              <p>{profile.department || "Не указано"}</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-custom-yellow mt-3 p-3 px-4 rounded-xl font-medium"
            >
              Задать вопрос
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-6 md:gap-12 items-center border-2 rounded-xl p-4">
          <div className="flex flex-col">
            <p>Дата рождение</p>
            <p>
              <strong>{profile.birth_date || "Не указано"}</strong>
            </p>
          </div>
          <div className="flex flex-col">
            <p>Контактные данные</p>
            <p>
              <strong>{profile.contacts || "Не указано"}</strong>
            </p>
          </div>
          <div className="flex flex-col">
            <p>Образование</p>
            <p>
              <strong>{profile.education || "Не указано"}</strong>
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-col border-2 rounded-xl p-4">
          <h3 className="font-bold text-xl">Биография</h3>
          <p className="mt-3">{profile.biography || "Не указано"}</p>
        </div>
      </div>

      {isModalOpen && (
        <FaqProfileModal
          profileId={profile.id}
          name={profile.name}
          close={() => setIsModalOpen(false)}
        />
      )}

      <Footer />
    </>
  );
}
