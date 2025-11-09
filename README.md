# MN FormBuilder

Plataforma para construir formularios conversacionales al estilo Typeform, con capacidades de lógica avanzada y un bloque especial de cálculo que permite sumar, restar, multiplicar y dividir valores capturados en el flujo.

## Monorepo

El proyecto utiliza workspaces de npm para organizar frontend, backend y librerías compartidas.

```
MN-formbuilder/
├─ apps/
│  ├─ web/   # Next.js 14
│  └─ api/   # NestJS 10
├─ packages/
│  ├─ ui/    # Componentes React reutilizables
│  ├─ core/  # Esquemas y tipos de dominio
│  └─ sdk/   # Cliente HTTP ligero
├─ prisma/   # Esquema inicial de datos
├─ docs/     # Documentación funcional y de diseño
└─ scripts/  # Utilidades de desarrollo y despliegue
```

## Comenzar

1. Instala dependencias compartidas y de cada workspace:
   ```bash
   npm install
   npm install --prefix apps/web
   npm install --prefix apps/api
   ```
2. Arranca los servicios en paralelo (Next.js y NestJS):
   ```bash
   npm run dev:web
   npm run dev:api
   ```
   También puedes usar el script `scripts/dev.sh` para automatizar la instalación y arranque simultáneo.
3. Ejecuta las pruebas unitarias del backend:
   ```bash
   npm --prefix apps/api run test
   ```

## Documentación

- [Arquitectura propuesta](docs/architecture.md)
- [Diseño UX/UI inicial](docs/ui-ux.md)

## Próximos pasos sugeridos

1. Configurar pipelines de CI/CD y despliegues automatizados (ver `.github/workflows/ci.yml`).
2. Implementar persistencia real en PostgreSQL usando Prisma y migraciones versionadas.
3. Extender el SDK y los paquetes UI/Core para cubrir bloques adicionales y manejo de autenticación.
4. Completar la cobertura de pruebas end-to-end y la integración con el bloque de cálculo en el frontend.
