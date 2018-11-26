import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioSolicitudes {
  vacantes: any = [{
    puesto: 'Ingeniero en sofware',
    salario: 10000,
    sexo: 'indistinto',
    idiomas: 'Ingles, Frances',
    experiencia: '5 años',
    horas: 12,
    horarios: 'matutido, despertino',
    extra: 'prestaciones de ley mas de lo normal, viaticos pagados'

  },{ puesto: 'Cajero en ley',
  salario: 2500,
  sexo: 'indistinto',
  idiomas: 'Español',
  experiencia: 'ninguna',
  horas: 10,
  horarios: 'matutido, despertino',
  extra: 'prestaciones de ley mas de lo normal, viaticos pagados'}]

  getvacantes(){
    return this.vacantes;
  }
  constructor() { }
}
