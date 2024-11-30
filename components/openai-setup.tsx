import { openAIKeyAtom } from "@/lib/atoms/openai"
import { geminiKeyAtom } from "@/lib/atoms/gemini"
import { useSetAtom } from "jotai"
import React from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface OpenAISetupProps {}

export default function OpenAISetup({}: OpenAISetupProps) {
  const setOpenAIKey = useSetAtom(openAIKeyAtom)
  const setGeminiKey = useSetAtom(geminiKeyAtom)
  const openaiInputRef = React.useRef<HTMLInputElement>(null)
  const geminiInputRef = React.useRef<HTMLInputElement>(null)

  const saveOpenAIKey = () => {
    const input = openaiInputRef.current
    if (!input) return
    setOpenAIKey(input.value)
  }

  const saveGeminiKey = () => {
    const input = geminiInputRef.current
    if (!input) return
    setGeminiKey(input.value)
  }

  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] pt-3.5 pb-2 px-3">
      <Tabs defaultValue="openai" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="openai">OpenAI Setup</TabsTrigger>
          <TabsTrigger value="gemini">Gemini Setup</TabsTrigger>
        </TabsList>
        <TabsContent value="openai">
          <div className="grid gap-4 w-full p-3 border-[0.5px] rounded-md border-zinc-200 dark:border-zinc-800 group">
            <Label htmlFor="openaiKey">OpenAI API Key</Label>
            <Input
              ref={openaiInputRef}
              id="openaiKey"
              type="password"
              placeholder="Enter your OpenAI API key"
            />
            <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
              <Button variant="outline" className="w-full h-12" onClick={saveOpenAIKey}>
                <span className="text-sm">Save OpenAI Key</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="gemini">
          <div className="grid gap-4 w-full p-3 border-[0.5px] rounded-md border-zinc-200 dark:border-zinc-800 group">
            <Label htmlFor="geminiKey">Gemini API Key</Label>
            <Input
              ref={geminiInputRef}
              id="geminiKey"
              type="password"
              placeholder="Enter your Gemini API key"
            />
            <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
              <Button variant="outline" className="w-full h-12" onClick={saveGeminiKey}>
                <span className="text-sm">Save Gemini Key</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
