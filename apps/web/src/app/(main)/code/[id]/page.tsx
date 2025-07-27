"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useCallback, useMemo } from "react";
import Select from "@src/components/atoms/select/Select";
import { addToast } from "@heroui/react";
import { questionService } from "@src/services/questions/question";
import { useParams } from "next/navigation";

type CodeSnippet = {
  id: string;
  title: string;
  languages: string[];
  starterCode: {
    javascript: string;
    python: string;
  };
};

export default function CodeEditorPage() {
  const params = useParams();
  const level = params?.id;
  console.log("Code Editor Page ID:", params);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      language: "javascript",
      code: "",
    },
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(
    null
  );

  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [completedSnippets, setCompletedSnippets] = useState<string[]>([]);

  const selectedLanguage = watch("language");

  const fetchQuestions = useCallback(async () => {
    const questions = await questionService.getQuestions(Number(level));
    setCodeSnippets(questions);
  }, [level]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const selectedSnippet = useMemo(() => {
    return (
      codeSnippets.find((snippet) => snippet.id === selectedSnippetId) || null
    );
  }, [codeSnippets, selectedSnippetId]);

  useEffect(() => {
    if (selectedSnippet) {
      const code =
        selectedSnippet.starterCode[
          selectedLanguage as "javascript" | "python"
        ];
      setValue("code", code || "");
    }
  }, [selectedSnippet, selectedLanguage, setValue]);

  const handleSnippetClick = (snippet: CodeSnippet) => {
    const lang = snippet.languages[0] as "javascript" | "python";
    setSelectedSnippetId(snippet.id);
    setValue("language", lang);
    setValue("code", snippet.starterCode[lang]);
  };

  const handleCodeRun = async (data: { language: string; code: string }) => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/run`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      const resultText = result.output || result.error || "No output";
      setOutput(resultText);

      if (result.output) {
        addToast({
          title: "Success",
          description: "Code executed successfully.",
          color: "success",
          variant: "solid",
        });

        const match = codeSnippets.find(
          (s) =>
            s.languages.includes(data.language) &&
            s.starterCode[data.language as "javascript" | "python"]?.trim() ===
              data.code.trim()
        );

        if (match && !completedSnippets.includes(match.id)) {
          setCompletedSnippets((prev) => [...prev, match.id]);
        }
      } else {
        addToast({
          title: result.error ? "Error" : "Notice",
          description: resultText,
          color: result.error ? "danger" : "warning",
        });
      }
    } catch {
      setOutput("Error running code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-black font-mono">
      <aside className="w-64 border-r border-gray-300 p-4 bg-gray-50">
        <h3 className="font-bold mb-4">📂 Code Snippets</h3>
        <ul className="space-y-2">
          {codeSnippets.map((snippet) => (
            <li
              key={snippet.id}
              className={`cursor-pointer p-2 border rounded ${
                completedSnippets.includes(snippet.id)
                  ? "bg-green-100 border-green-500"
                  : "bg-white hover:bg-gray-100 border-gray-200"
              }`}
              onClick={() => handleSnippetClick(snippet)}
            >
              {snippet.title} {completedSnippets.includes(snippet.id) && "✅"}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <form onSubmit={handleSubmit(handleCodeRun)} className="space-y-4">
            <Select
              control={control}
              name="language"
              placeholder="Select Language"
              options={[
                { label: "JavaScript", value: "javascript" },
                { label: "Python", value: "python" },
              ]}
            />

            <div>
              <label className="font-semibold mb-1 block">Your Code</label>
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full h-64 p-4 bg-gray-100 border border-gray-400 rounded text-sm leading-relaxed resize-none text-black"
                    spellCheck={false}
                  />
                )}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </form>

          <div className="mt-4 bg-gray-100 text-black p-4 border-l-4 border-green-500 text-sm whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </main>
    </div>
  );
}
