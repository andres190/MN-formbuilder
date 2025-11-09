import { Module } from '@nestjs/common';
import { FormsModule } from './modules/forms/forms.module';
import { CalculationsModule } from './modules/calculations/calculations.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [HealthModule, FormsModule, CalculationsModule]
})
export class AppModule {}
