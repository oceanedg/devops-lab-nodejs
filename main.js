/**
 * Lab 5, part 2.5: imports the data module and uses its functions.
 * Run with: node main.js
 */
import { doctors, addDoctor, countDoctors } from './hospitalData.js'

addDoctor('Dr. Martin')
console.log('Updated doctors:', doctors)
console.log(`Number of doctors: ${countDoctors()}`)
