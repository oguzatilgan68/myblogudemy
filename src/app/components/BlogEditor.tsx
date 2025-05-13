"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"], // Kalın, italik, altı çizili, üstü çizili
    [{ list: "ordered" }, { list: "bullet" }], // Sıralı ve sırasız liste
    [{ script: "sub" }, { script: "super" }], // Üst ve alt simge
    [{ indent: "-1" }, { indent: "+1" }], // Girinti
    [{ direction: "rtl" }], // Sağdan sola yazı
    [{ size: ["small", false, "large", "huge"] }], // Yazı boyutu
    [{ color: [] }, { background: [] }], // Yazı ve arka plan rengi
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"], // Medya öğeleri
    ["clean"], // Temizle (biçimlendirmeleri kaldır)
  ],
};

// Generic bileşen tipi
type Props<T extends FieldValues> = {
  field: ControllerRenderProps<T, FieldPath<T>>;
};

export default function RichTextEditor<T extends FieldValues>({
  field,
}: Props<T>) {
  return (
    <ReactQuill
      theme="snow"
      value={field.value}
      onChange={field.onChange}
      modules={modules}
    />
  );
}
