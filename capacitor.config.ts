import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.auly.regalos',
  appName: 'Auly Regalos & Bolsos',
  webDir: 'out',
  server: {
    // Reemplazar con el dominio asignado por Cloudflare Pages cuando despliegues
    // url: 'https://auly-regalos-app.pages.dev',
    cleartext: true
  }
};

export default config;
