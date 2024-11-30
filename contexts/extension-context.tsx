import { supabase } from "@/lib/supabase"
import type { Provider, User } from "@supabase/supabase-js"
import * as React from "react"

// user auth

interface ExtensionState {
  extensionContainer: HTMLElement | null
  extensionIsOpen: boolean
  extensionTheme: Theme | null
  extensionLoading: boolean
  extensionPanel: Panel
  extensionVideoId: string | null
  extensionData: any
}

const initialState: ExtensionState = {
  extensionContainer: null,
  extensionIsOpen: true,
  extensionTheme: null,
  extensionLoading: false,
  extensionPanel: "Summary",
  extensionVideoId: null,
  extensionData: null
}

interface ExtensionActions {
  setExtensionContainer: (container: HTMLElement | null) => void
  setExtensionIsOpen: (isOpen: boolean) => void
  setExtensionTheme: (theme: Theme | null) => void
  setExtensionLoading: (loading: boolean) => void
  setExtensionPanel: (panel: Panel) => void
  setExtensionVideoId: (videoId: string | null) => void
  setExtensionData: (data: any) => void
  resetExtension: () => void
}

interface ExtensionContext extends ExtensionState, ExtensionActions {}

const ExtensionContext = React.createContext<ExtensionContext | undefined>(undefined)

export function useExtension() {
  const context = React.useContext(ExtensionContext)
  if (!context) {
    throw new Error("useExtension must be used within a ExtensionProvider")
  }
  return context
}

interface ExtensionProviderProps {
  children: React.ReactNode
}

export function ExtensionProvider({ children }: ExtensionProviderProps) {
  const [extensionContainer, setExtensionContainer] = React.useState<HTMLElement | null>(null)
  const [extensionIsOpen, setExtensionIsOpen] = React.useState(true)
  const [extensionPanel, setExtensionPanel] = React.useState<Panel>("Summary")
  const [extensionVideoId, setExtensionVideoId] = React.useState<string | null>(null)
  const [extensionLoading, setExtensionLoading] = React.useState(false)
  const [extensionData, setExtensionData] = React.useState<any>(null)
  const [extensionTheme, setExtensionTheme] = React.useState<Theme | null>(null)

  const openAIKey = useAtomValue(openAIKeyAtom)
  const geminiKey = useAtomValue(geminiKeyAtom)

  // User Auth logic

  function resetExtension() {
    setExtensionContainer(initialState.extensionContainer)
    setExtensionIsOpen(initialState.extensionIsOpen)
    setExtensionTheme(initialState.extensionTheme)
    setExtensionLoading(initialState.extensionLoading)
    setExtensionPanel(initialState.extensionPanel)
    setExtensionVideoId(initialState.extensionVideoId)
    setExtensionData(initialState.extensionData)
  }

  const value = {
    extensionContainer,
    setExtensionContainer,
    extensionIsOpen,
    setExtensionIsOpen,
    extensionPanel,
    setExtensionPanel,
    extensionVideoId,
    setExtensionVideoId,
    extensionLoading,
    setExtensionLoading,
    extensionData: extensionData ? { ...extensionData, openAIKey, geminiKey } : null,
    setExtensionData,
    extensionTheme,
    setExtensionTheme,
    resetExtension
  }

  return <ExtensionContext.Provider value={value}>{children}</ExtensionContext.Provider>
}
