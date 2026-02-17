"use client";

import { Icon } from "@iconify/react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  if (!isOpen) return null;

  const handleRegistration = (type: "wakadep" | "anggota") => {
    // Ganti dengan link form yang sesuai
    const formLinks = {
      wakadep: "https://forms.gle/Xi9oBWqdTucXuzsY7", // Link form Wakadep
      anggota: "https://forms.gle/ybDWtuH5q8piYmXD9", // Link form Anggota
    };

    window.open(formLinks[type], "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-red-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Pilih Jenis Pendaftaran</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/90 text-sm mt-2">
            Pilih posisi yang ingin kamu daftarkan
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          {/* Wakadep Option */}
          <button
            onClick={() => handleRegistration("wakadep")}
            className="group w-full p-6 bg-linear-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl hover:border-purple-600 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Icon icon="mdi:account-star" className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  Wakil Ketua Departemen (Wakadep)
                </h4>
                <p className="text-sm text-gray-600">
                  Daftar sebagai calon Wakil Kepala Departemen
                </p>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>

          {/* Anggota Option */}
          <button
            onClick={() => handleRegistration("anggota")}
            className="group w-full p-6 bg-linear-to-br from-red-50 to-pink-100 border-2 border-red-200 rounded-2xl hover:border-red-600 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Icon icon="mdi:account-group" className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  Anggota Departemen
                </h4>
                <p className="text-sm text-gray-600">
                  Daftar sebagai calon Anggota Departemen
                </p>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className="w-6 h-6 text-red-600 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
