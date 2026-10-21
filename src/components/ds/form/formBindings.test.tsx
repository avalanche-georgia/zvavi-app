import { zodResolver } from '@hookform/resolvers/zod'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import FormChipGroup from './FormChipGroup'
import FormTextField from './FormTextField'
import messages from '../../../../messages/en.json'

// The hooks barrel also exports data hooks that need a Supabase client
vi.mock('@components/hooks', async () => ({
  useFieldError: (await import('@components/hooks/useFieldError')).default,
}))

const schema = z.object({
  aspect: z.string({ error: () => ({ message: 'required' }) }),
  name: z.string().min(1, { error: () => ({ message: 'required' }) }),
})

type Values = z.input<typeof schema>

const Harness = ({ onSubmit }: { onSubmit: (values: Values) => void }) => {
  const form = useForm<Values>({ defaultValues: { name: '' }, resolver: zodResolver(schema) })

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextField<Values> label="Name" name="name" requiredMessage="Add your name." />
          <FormChipGroup<Values, string>
            label="Aspect"
            name="aspect"
            options={[{ label: 'N', value: 'n' }]}
          />
          <button type="submit">Send</button>
        </form>
      </FormProvider>
    </NextIntlClientProvider>
  )
}

// The bindings only wire react-hook-form to a primitive: value in, onChange out, translated error
describe('form bindings', () => {
  it('show the field-specific or translated error, then submit the bound values', async () => {
    const onSubmit = vi.fn()

    render(<Harness onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('Add your name.')).toBeInTheDocument()
    expect(screen.getByText(messages.common.validation.required)).toBeInTheDocument()

    await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'Nino')
    await userEvent.click(screen.getByRole('button', { name: 'N' }))
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSubmit).toHaveBeenCalledWith({ aspect: 'n', name: 'Nino' }, expect.anything())
  })
})
