"use client"

import { useCallback, useEffect, useState } from "react"
import ReactFlow, {
  Background, Controls,
  useNodesState, useEdgesState,
  type Node, type Edge, type Connection,
  BackgroundVariant,
} from "reactflow"
import "reactflow/dist/style.css"
import dagre from "@dagrejs/dagre"
import { motion } from "framer-motion"
import { UserPlus, Users } from "lucide-react"
import { PersonNode, type FamilyMember } from "./person-node"
import { PersonModal } from "./person-modal"

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: "TB", nodesep: 34, ranksep: 64 })
  g.setDefaultEdgeLabel(() => ({}))
  nodes.forEach(n => g.setNode(n.id, { width: 158, height: 54 }))
  edges.forEach(e => g.setEdge(e.source, e.target))
  dagre.layout(g)
  return {
    nodes: nodes.map(n => {
      const { x, y } = g.node(n.id)
      return { ...n, position: { x: x - 79, y: y - 27 } }
    }),
    edges,
  }
}

const nodeTypes = { person: PersonNode }

type Relationship = { ancestor: string; descendant: string; depth: number }
type Marriage     = { id: string; person1Id: string; person2Id: string }

type Props = { onCountChange?: (n: number) => void }

export function FamilyTree({ onCountChange }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [members, setMembers]            = useState<FamilyMember[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [marriages, setMarriages]        = useState<Marriage[]>([])
  const [loading, setLoading]            = useState(true)
  const [editMember, setEditMember]      = useState<FamilyMember | null>(null)
  const [parentMember, setParentMember]  = useState<FamilyMember | null>(null)
  const [modalOpen, setModalOpen]        = useState(false)

  async function fetchData() {
    const [mRes, rRes] = await Promise.all([
      fetch("/api/family/members"),
      fetch("/api/family/relationships"),
    ])
    const mData = await mRes.json()
    const rData = await rRes.json()
    setMembers(mData)
    setRelationships(rData.parentChild ?? [])
    setMarriages(rData.marriages ?? [])
    setLoading(false)
    onCountChange?.(mData.length)
  }

  useEffect(() => { fetchData() }, [])

  const buildGraph = useCallback(() => {
    const rawNodes: Node[] = members.map(m => ({
      id: m.id,
      type: "person",
      position: { x: 0, y: 0 },
      data: {
        member: m,
        onEdit:     (member: FamilyMember) => { setEditMember(member); setParentMember(null); setModalOpen(true) },
        onAddChild: (parent: FamilyMember) => { setParentMember(parent); setEditMember(null); setModalOpen(true) },
      },
    }))

    const rawEdges: Edge[] = [
      ...relationships.map(r => ({
        id: `pc-${r.ancestor}-${r.descendant}`,
        source: r.ancestor,
        target: r.descendant,
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "#8b5cf6",
          strokeWidth: 2.5,
          opacity: 0.85,
        },
        markerEnd: { type: "arrowclosed" as const, color: "#8b5cf6", width: 14, height: 14 },
      })),
      ...marriages.map(m => ({
        id: `m-${m.id}`,
        source: m.person1Id,
        target: m.person2Id,
        type: "straight",
        style: { stroke: "#d946ef", strokeWidth: 1.5, strokeDasharray: "6,3", opacity: 0.55 },
        label: "💍",
        labelStyle: { fontSize: 12 },
      })),
    ]

    const { nodes: ln, edges: le } = getLayoutedElements(rawNodes, rawEdges)
    setNodes(ln)
    setEdges(le)
  }, [members, relationships, marriages])

  useEffect(() => { if (!loading) buildGraph() }, [loading, buildGraph])

  async function handleSave(data: Partial<FamilyMember>) {
    if (editMember) {
      await fetch(`/api/family/members/${editMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } else {
      const res = await fetch("/api/family/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, parentId: parentMember?.id }),
      })
      const newMember = await res.json()
      if (parentMember) {
        await fetch("/api/family/relationships", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "parent-child", parentId: parentMember.id, childId: newMember.id }),
        })
      }
    }
    await fetchData()
  }

  async function handleDelete() {
    if (!editMember) return
    await fetch(`/api/family/members/${editMember.id}`, { method: "DELETE" })
    await fetchData()
  }

  // Drag-to-connect: source = الأب (handle السفلي)، target = الابن (handle العلوي)
  const onConnect = useCallback(async (conn: Connection) => {
    if (!conn.source || !conn.target || conn.source === conn.target) return
    await fetch("/api/family/relationships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "parent-child", parentId: conn.source, childId: conn.target }),
    })
    await fetchData()
  }, [])

  const openAdd = () => { setEditMember(null); setParentMember(null); setModalOpen(true) }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">

      {/* Add button */}
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={openAdd}
          className="premium-btn-primary h-9 px-4 text-xs flex items-center gap-2 shadow-xl shadow-[var(--accent)]/20"
        >
          <UserPlus className="w-3.5 h-3.5" />
          إضافة فرد
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full" style={{ background: "var(--bg)" }}>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-xl
              animate-pulse" style={{ background: "linear-gradient(135deg,var(--accent),var(--accent-2))" }}>
              🌳
            </div>
            <p className="text-xs text-[var(--text-muted)]">جاري التحميل...</p>
          </div>
        </div>

      ) : members.length === 0 ? (
        <div className="flex items-center justify-center h-full" style={{ background: "var(--bg)" }}>
          <div className="text-center space-y-4 max-w-xs p-8 rounded-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--glass-border)" }}>
            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              style={{ background: "linear-gradient(135deg,var(--accent),var(--accent-2))" }}>
              🌱
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "var(--text)" }}>الشجرة فارغة</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                ابدأ بإضافة أول فرد في العائلة
              </p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={openAdd} className="premium-btn-primary w-full py-2.5 text-xs">
              <Users className="w-3.5 h-3.5 inline ml-1.5" />
              إضافة العضو الأول
            </motion.button>
          </div>
        </div>

      ) : (
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView fitViewOptions={{ padding: 0.3 }}
          minZoom={0.15} maxZoom={2.5}
          connectionRadius={45}
          connectionLineStyle={{ stroke: "#8b5cf6", strokeWidth: 2.5 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: "var(--bg)" }}
        >
          {/* Clean grid background */}
          <Background
            variant={BackgroundVariant.Lines}
            gap={36} size={1}
            color="var(--border)"
            style={{ opacity: 0.4 }}
          />

          {/* Grouped controls panel */}
          <Controls
            showInteractive={false}
            style={{ left: "auto", right: 14, bottom: 14 }}
            className="!bg-[var(--surface)] !border !border-[var(--border)] !rounded-xl !shadow-lg overflow-hidden
              [&>button]:!bg-transparent [&>button]:!border-b [&>button]:!border-[var(--border)]
              [&>button]:!w-9 [&>button]:!h-9 [&>button]:!text-[var(--text-muted)]
              [&>button:last-child]:!border-b-0
              [&>button:hover]:!bg-[var(--surface-2)] [&>button:hover]:!text-[var(--accent)]
              [&_svg]:!fill-current"
          />
        </ReactFlow>
      )}

      <PersonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        member={editMember}
        parentName={parentMember?.fullName}
        onSave={handleSave}
        onDelete={editMember ? handleDelete : undefined}
      />
    </div>
  )
}
