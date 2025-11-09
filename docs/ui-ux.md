# Diseño UX/UI inicial

## Principios de diseño
- **Conversacional y humano**: interacción a pantalla completa, una pregunta a la vez, tono amigable.
- **Guía clara**: barra de progreso y microinteracciones que indiquen el avance.
- **Accesibilidad**: contraste AA, soporte de teclado, texto legible, mensajes claros.
- **Personalización visual**: colores, tipografías, layouts y fondos configurables por formulario.

## Personas y escenarios
1. **Creador de formularios (María, Marketing Manager)**
   - Necesita construir encuestas personalizadas en minutos.
   - Requiere lógica condicional y cálculos para evaluar presupuestos.
2. **Respondente final (Luis, cliente potencial)**
   - Desea completar un formulario sin fricción, desde móvil.
   - Quiere entender por qué se solicita cada dato.

## User Journey principal
1. María accede al dashboard y elige "Crear formulario".
2. Arrastra bloques desde la biblioteca (texto, selección, cálculo, etc.).
3. Configura propiedades en un panel lateral y define reglas de navegación.
4. Previsualiza el flujo en tiempo real y realiza ajustes.
5. Publica y comparte el enlace.
6. Luis abre el formulario, responde paso a paso, visualiza el resultado del cálculo en tiempo real y envía.
7. María revisa respuestas y métricas.

## Mapa de navegación (Studio)
- Dashboard
  - Formularios
    - Editor (Canvas + Panel lateral + Barra superior)
      - Biblioteca de bloques
      - Configuración de bloque
      - Configuración de lógica y cálculos
  - Analytics
- Ajustes de Workspace

## Componentes clave del Editor
- **Barra superior**: nombre del formulario, estado (draft/published), botones de previsualizar, publicar y compartir.
- **Panel izquierdo (Biblioteca)**: lista de bloques agrupados por categorías (Básicos, Elección, Multimedia, Cálculo, Integraciones).
- **Lienzo central**: secuencia de pasos; cada bloque se muestra como tarjeta con acciones (duplicar, eliminar, mover).
- **Panel derecho**: pestañas para Propiedades, Lógica y Diseño.
  - En Propiedades de un bloque de cálculo se presenta un constructor visual con operadores `+`, `-`, `*`, `/` y variables arrastrables.
- **Vista de previsualización**: modal o layout paralelo con el flujo final.

## Wireframes de alta nivel

### 1. Dashboard de formularios
```
┌─────────────────────────────────────────────────────────────┐
│ MN FormBuilder                             [Crear formulario]│
├─────────────────────────────────────────────────────────────┤
│ Mis formularios                                              │
│ ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │
│ │ Encuesta NPS  │  │ Registro Lead │  │ Cotizador     │ ... │
│ │ Borrador      │  │ Publicado     │  │ Borrador      │     │
│ └───────────────┘  └───────────────┘  └───────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 2. Editor con paneles
```
┌───────────────────────────────────────────────────────────────┐
│ Barra superior: [Nombre del formulario] [Estado] [Preview] [Publicar]│
├─────────────┬──────────────────────────────┬─────────────────┤
│ Biblioteca  │            Lienzo            │     Panel       │
│ [Texto]     │ ┌─────────────┐              │ Propiedades     │
│ [Número]    │ │ Pregunta 1  │              │ - Etiqueta      │
│ [Cálculo]   │ │ Pregunta 2  │ ← seleccionado│ - Placeholder   │
│ ...         │ │ Cálculo     │              │ - Reglas        │
│             │ └─────────────┘              │ - Diseño        │
└─────────────┴──────────────────────────────┴─────────────────┘
```

### 3. Constructor del bloque de cálculo
```
┌───────────── Constructor de Cálculo ─────────────┐
│ Nombre: [Total cotización]                        │
│ Descripción: [Suma subtotal + impuestos]          │
│ Expresión: [ {{subtotal}} + ( {{subtotal}} * {{iva}} ) ]
│ Variables disponibles                              │
│ ┌──────────┐  ┌─────────┐  ┌─────────┐             │
│ │Subtotal  │  │IVA (%)  │  │Descuento│             │
│ └──────────┘  └─────────┘  └─────────┘             │
│ Operadores:  [+] [-] [×] [÷]                       │
│ Vista previa: Total = $1,160.00                    │
└────────────────────────────────────────────────────┘
```

### 4. Experiencia del respondente
```
┌──────────────────────────────────────────┐
│ Logo                             45%     │
│──────────────────────────────────────────│
│ Pregunta: ¿Cuál es el monto del pedido? │
│ [__________]                            │
│                                          │
│ Botón [Siguiente]                        │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Pregunta: ¿Cuál es el IVA aplicable?     │
│ [__________]                            │
└──────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────┐
│ Total estimado: $1,160.00 (Calculado)    │
│ [Enviar]                                 │
└──────────────────────────────────────────┘
```

## Sistema visual inicial
- **Colores**: Primario (#6C5CE7), Secundario (#00B894), Fondo (#F9FAFB), Texto (#1F2937).
- **Tipografía**: Inter para UI, Poppins para titulares.
- **Botones**: estilo pill, sombra ligera, animaciones microinteractivas.
- **Iconografía**: set lineal (Feather Icons) consistente.

## Consideraciones de accesibilidad
- Focus visible en todos los elementos interactivos.
- Mensajes de error en texto y color (rojo #EF4444) con icono descriptivo.
- Soporte para lectores de pantalla (atributos ARIA, orden lógico).

## Próximos pasos
1. Refinar wireframes en Figma con variaciones responsive.
2. Prototipo interactivo del flujo de creación y respuesta.
3. Testear con 5 usuarios y ajustar microcopys.
4. Definir design tokens en `packages/ui` y documentar en Storybook.

