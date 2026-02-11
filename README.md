# DevProject

**Sistema de Gestión de Proyectos de Desarrollo** - Monday.com App

Arquitectura de app basada en el estándar **PMBOK 7ma Edición** del PMI, diseñada para Unidades Ejecutoras de Proyectos (UEP) de desarrollo financiados por banca multilateral.

## Arquitectura

```
Nivel Estratégico    Portafolio ← Pipeline de Aprobación
                          ↓
Nivel Táctico        Panel General → Marco Lógico ↔ POA ↔ Plan Adquisiciones
                                    ↕               ↕          ↓
                     Stakeholders  G. Financiera ← Contratos  Riesgos
                                        ↕
Nivel Operativo      Componente [1..N]  Issues/Cambios  Lecciones Aprendidas
```

- **13 boards** interconectados en 3 niveles
- **15+ conexiones** cross-board automáticas
- **17 automatizaciones** (escalamientos, sincronización, notificaciones)
- **100+ columnas** tipadas cubriendo los 8 dominios PMI

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| API | Monday.com GraphQL API v2 |
| SDK | `monday-sdk-js`, `@mondaydotcomorg/api`, `@mondaycom/apps-sdk` |
| UI | CSS custom (compatible con `@vibe/core`) |

## Estructura del Proyecto

```
src/
├── client/                    # React frontend
│   ├── components/            # Header, Sidebar, BoardCard
│   ├── views/                 # Dashboard, Provisioning, Schema, Automations, Architecture
│   ├── styles/                # CSS global
│   ├── App.tsx                # App principal con navegación
│   └── main.tsx               # Entry point
│
├── server/                    # Express backend
│   ├── middleware/auth.ts     # JWT verification (Monday signing secret)
│   ├── routes/
│   │   ├── provisioning.ts   # POST /api/provision + GET /api/provision/schema
│   │   ├── monday.ts         # Integration recipes (execute_action, subscribe)
│   │   └── oauth.ts          # OAuth 2.0 flow
│   ├── services/
│   │   ├── monday-api.ts     # GraphQL API client
│   │   ├── provisioning.ts   # Workspace provisioning engine
│   │   └── automation-handler.ts  # Cross-board automation execution
│   ├── scripts/provision.ts  # CLI provisioning script
│   └── app.ts                # Express server entry point
│
└── shared/                    # Shared types and schemas
    ├── types/
    │   ├── monday.ts          # Monday.com types (Board, Column, Group, Automation)
    │   └── project.ts         # Domain types (PMI, UEP, procurement, risks)
    └── schemas/
        ├── boards/            # 13 board definitions
        ├── all-boards.ts      # Board registry with level grouping
        ├── automations.ts     # 17 automation definitions (A1-A17)
        ├── connections.ts     # 15 cross-board connections
        └── template.ts        # Complete workspace template
```

## Boards Definidos

| Nivel | Board | Dominios PMI |
|-------|-------|-------------|
| Estratégico | Portafolio de Proyectos | Stakeholders, Medición |
| Estratégico | Pipeline de Aprobación | Stakeholders, Planificación |
| Táctico | Panel General Proyecto | Todos |
| Táctico | Marco Lógico / Resultados | Planificación, Entrega, Medición |
| Táctico | POA (Plan Operativo Anual) | Planificación, Trabajo |
| Táctico | Plan de Adquisiciones | Planificación, Trabajo |
| Táctico | Gestión Financiera | Planificación, Medición |
| Táctico | Registro de Riesgos | Incertidumbre |
| Táctico | Stakeholders y Comunicaciones | Stakeholders |
| Operativo | Componente [1..N] | Equipo, Trabajo, Entrega |
| Operativo | Gestión de Contratos | Trabajo, Entrega |
| Operativo | Issues y Cambios | Incertidumbre, Trabajo |
| Operativo | Lecciones Aprendidas | Incertidumbre, Medición |

## Uso

### Desarrollo local

```bash
npm install
cp .env.example .env   # Configurar credenciales
npm run dev             # Inicia servidor + cliente
```

### Provisionar un workspace

```bash
# Via CLI
npm run provision -- --name "DevProject" --components 3

# Via API
curl -X POST http://localhost:8080/api/provision \
  -H "Content-Type: application/json" \
  -d '{"projectName":"Mi Proyecto","numComponents":3,"apiToken":"..."}'
```

### Desplegar a Monday.com

```bash
npm run build
npm run deploy    # Requiere mapps CLI configurado
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/provision/schema` | Schema completo de boards |
| POST | `/api/provision` | Provisionar workspace completo |
| POST | `/api/monday/execute_action` | Ejecutar automatización |
| POST | `/api/monday/subscribe` | Registrar recipe de integración |
| POST | `/api/monday/unsubscribe` | Eliminar recipe |
| GET | `/oauth/authorize` | Iniciar flujo OAuth |
| GET | `/oauth/callback` | Callback OAuth |

## Requisitos Monday.com

- **Plan Pro** (mínimo): Dependencias, 25K automatizaciones/mes, 20 boards/dashboard
- API Token con permisos: `boards:read`, `boards:write`, `workspaces:read`, `workspaces:write`
