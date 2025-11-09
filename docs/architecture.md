# Arquitectura de MN FormBuilder

## Visión general
MN FormBuilder es una plataforma web para crear formularios conversacionales al estilo Typeform. El objetivo es permitir que equipos de marketing, operaciones y atención al cliente construyan experiencias personalizadas sin necesidad de código, integrando validaciones, lógica condicional y un campo especial de "Cálculo" para operar con valores numéricos capturados en el formulario.

La solución se diseñará como una aplicación web moderna con separación clara entre frontend y backend, apoyada en servicios escalables y automatizados.

## Stack tecnológico sugerido
- **Frontend**: Next.js 14 (App Router) + TypeScript, Tailwind CSS, Zustand para estado cliente, React Hook Form.
- **Backend**: NestJS + TypeScript. Microservicio principal expuesto como API REST/GraphQL, con Socket.IO para previsualización en tiempo real.
- **Base de datos**: PostgreSQL + Prisma ORM.
- **Infraestructura**: Docker y Docker Compose para desarrollo; despliegue en Kubernetes/Render/Heroku con CI/CD en GitHub Actions.
- **Autenticación**: Auth0 / OAuth 2.0 con JWT.
- **Observabilidad**: Sentry para trazabilidad de errores, Logtail para logs, Prometheus + Grafana para métricas.

## Estructura del repositorio monorepo
```
MN-formbuilder/
├─ apps/
│  ├─ web/                 # Frontend Next.js
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  └─ public/
│  └─ api/                 # Backend NestJS
│     ├─ src/
│     │  ├─ modules/
│     │  │  ├─ forms/
│     │  │  ├─ blocks/
│     │  │  ├─ calculations/
│     │  │  ├─ analytics/
│     │  │  └─ integrations/
│     │  ├─ common/
│     │  └─ main.ts
│     └─ test/
├─ packages/
│  ├─ ui/                  # Librería de componentes compartidos (Storybook)
│  ├─ core/                # Modelos, validaciones, tipos compartidos
│  └─ sdk/                 # Cliente JS para consumir la API
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ docs/
│  ├─ architecture.md
│  └─ ui-ux.md
├─ scripts/
│  ├─ dev.sh
│  └─ deploy.sh
├─ .github/workflows/
│  └─ ci.yml
├─ package.json            # Yarn/npm workspace root
└─ README.md
```

## Módulos clave
### Frontend (apps/web)
- **Form Builder Studio**: editor drag & drop, árbol de bloques y propiedades.
- **Flow Orchestrator**: gestiona navegación secuencial, lógica condicional y ramificaciones.
- **Preview Engine**: renderiza en tiempo real, sincronizado por WebSockets.
- **Theme Manager**: personalización de branding, tipografías y layouts.
- **Analytics Dashboard**: métricas de conversiones, embudos, respuestas.

### Backend (apps/api)
- **Module `forms`**: CRUD de formularios, versionado, publicación.
- **Module `blocks`**: catálogo de campos (texto, fecha, selección, archivo, cálculo, etc.).
- **Module `calculations`**: gestiona expresiones aritméticas con validación y ejecución segura (parser + sandbox).
- **Module `logic`**: condiciones, saltos, puntuaciones.
- **Module `responses`**: recolección de respuestas, persistencia, notificaciones.
- **Module `integrations`**: webhooks, Zapier, Slack, Google Sheets.

## Campo especial de cálculo
El campo de "Cálculo" permite definir operaciones aritméticas (suma, resta, multiplicación, división) basadas en variables provenientes de otros campos numéricos del formulario.

- **Definición**: el editor ofrece un constructor visual de fórmulas tipo `{{monto_1}} + {{monto_2}} * 0.16`.
- **Validación**: el backend parsea la expresión (por ejemplo con `expr-eval`) y garantiza que solo se usen operadores permitidos.
- **Evaluación**: en la recolección de respuestas, el cálculo se ejecuta automáticamente y se guarda en el resultado.
- **Uso**: el valor calculado puede mostrarse dinámicamente en pantallas siguientes, usarse para condiciones (ej. “si total > 500”) o enviarse a integraciones.

## Modelado de datos
### Entidades principales
- `User`: creador/colaborador.
- `Workspace`: agrupa formularios y recursos.
- `Form`: metadatos, estado (draft/published), configuración de apariencia.
- `Block`: definición de cada campo. Incluye tipo (`TEXT`, `CHOICE`, `CALCULATION`, etc.) y configuración.
- `Calculation`: expresión y mapeo de variables a bloques.
- `Response`: instancia de respuesta con pasos contestados.
- `Event`: eventos para analytics.

### Relaciones
- Un `Workspace` tiene múltiples `Forms` y usuarios con roles.
- Un `Form` contiene una colección ordenada de `Blocks` (1:N) y opcionalmente un `Theme`.
- `Calculation` se asocia a un `Block` de tipo cálculo.
- `Response` guarda valores por `Block` y está ligado al `Form`.

## APIs principales
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/forms` | Crear formulario nuevo |
| GET    | `/forms/:id` | Obtener formulario con bloques |
| PATCH  | `/forms/:id` | Actualizar metadatos o estructura |
| POST   | `/forms/:id/publish` | Publicar y generar URL pública |
| POST   | `/blocks` | Crear bloque genérico |
| POST   | `/blocks/calculation` | Crear bloque de cálculo con expresión |
| POST   | `/responses` | Guardar respuesta |
| GET    | `/analytics/forms/:id` | Métricas del formulario |

## Flujo general
1. Usuario ingresa al Studio y crea un formulario.
2. Añade bloques arrastrándolos; al crear un "Cálculo" se seleccionan variables y operadores.
3. El formulario se previsualiza en tiempo real via WebSocket.
4. Al publicar, se genera una versión congelada.
5. Usuarios finales completan el formulario conversacional.
6. El backend evalúa cálculos, guarda respuestas y ejecuta integraciones.

## Seguridad y permisos
- Control de acceso basado en roles por Workspace.
- Versionado para editar sin afectar formularios en producción.
- Auditoría de cambios (quién editó, cuándo).
- Rate limiting y protección CSRF en endpoints públicos.

## Escalabilidad futura
- Modularización de bloques para permitir marketplace.
- Motor de reglas avanzado (IF/ELSE, puntajes, cálculos compuestos).
- Multi-idioma y localización de formularios.
- Exportación e importación de formularios (JSON/YAML).

