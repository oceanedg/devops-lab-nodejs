/**
 * Lab 5, part 2.5: data and functions shared with main.js.
 */
export const doctors = ['Dr. Lee', 'Dr. Khan']

export function addDoctor (name) {
  doctors.push(name)
}

export function countDoctors () {
  return doctors.length
}
