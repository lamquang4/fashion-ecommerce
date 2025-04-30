"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function TinyMCEEditor() {
  return (
    <Editor
      apiKey="siwdxq4dd9436t9lhf5mko4n5m9h8ozdbvh0ztmuz9atxjs9"
      value={""}
      init={{
        menubar: false,
        branding: false,
        height: "350px",
        plugins: [
          "lists",
          "link",
          "image",
          "anchor",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo formatselect h1 h2 h3 bold italic alignleft aligncenter alignright link bullist numlist image media",
        content_style: `
          h1 { font-size: 1.5rem; font-weight: 700;   line-height: 0.7; }
          h2 { font-size: 1.25rem; font-weight: 700;   line-height: 0.7; }
          h3 { font-size: 1.125rem; font-weight: 700;   line-height: 0.7; }
          a { color: #3b82f6; text-decoration: underline;   line-height: 0.7; }
          p { line-height: 0.7; font-size: 0.9rem; }
          .mce-content-body {
          padding: 6px 10px;
          margin: 0;
            font-family: Quicksand;
          }
            body{
            line-height: 0.7;
            }
        `,
      }}
    />
  );
}
