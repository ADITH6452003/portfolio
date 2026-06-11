import React, { useState } from 'react'
import './ProjectWorkflow.css'

const TYPE_CONFIG = {
  user: { label: 'User Action', icon: '👤', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  ui: { label: 'UI / React', icon: '⚛️', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  api: { label: 'API / Network', icon: '🔌', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
  server: { label: 'Server / Logic', icon: '⚙️', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  db: { label: 'Database', icon: '🗄️', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
  ml: { label: 'ML / AI Model', icon: '🤖', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  external: { label: 'External Service', icon: '📡', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.1)' }
}

export default function ProjectWorkflow({ flows, accentColor }) {
  const [activeTab, setActiveTab] = useState(0)

  if (!flows || flows.length === 0) return null

  const currentFlow = flows[activeTab] || flows[0]

  return (
    <div className="project-workflow-container" style={{ '--project-accent': accentColor }}>
      {flows.length > 1 && (
        <div className="flow-tabs">
          {flows.map((flow, idx) => (
            <button
              key={flow.name}
              className={`flow-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveTab(idx)
              }}
            >
              {flow.name}
            </button>
          ))}
        </div>
      )}

      <div className="flow-diagram">
        <div className="flow-line-track">
          <div className="flow-line-pulse" />
        </div>

        <div className="flow-steps">
          {currentFlow.steps.map((step, stepIdx) => {
            const config = TYPE_CONFIG[step.type] || TYPE_CONFIG.ui
            return (
              <div key={stepIdx} className="flow-step-item">
                <div className="flow-step-dot" style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }}>
                  <span className="flow-step-icon">{config.icon}</span>
                </div>
                <div className="flow-step-content">
                  <span className="flow-step-badge" style={{ color: config.color, backgroundColor: config.bg, borderColor: `${config.color}20` }}>
                    {config.label}
                  </span>
                  <p className="flow-step-label">{step.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
