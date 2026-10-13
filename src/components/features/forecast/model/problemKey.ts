import type { Problem } from '@domain/types'

// Stable identity of a problem within its forecast — a type appears only once
export const getProblemKey = (problem: Problem) => String(problem.id ?? problem.type)
