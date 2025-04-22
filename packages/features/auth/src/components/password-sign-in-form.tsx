'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { If } from '@kit/ui/if';
import { Input } from '@kit/ui/input';
import { Trans } from '@kit/ui/trans';

import { PasswordSignInSchema } from '../schemas/password-sign-in.schema';

export function PasswordSignInForm({
  onSubmit,
  loading,
}: {
  onSubmit: (params: z.infer<typeof PasswordSignInSchema>) => unknown;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof PasswordSignInSchema>>({
    resolver: zodResolver(PasswordSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        className={'w-full space-y-2.5'}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="textstyle-input-label">
                <Trans i18nKey={'Email'} />
              </FormLabel>

              <FormControl>
                <Input
                  data-test={'email-input'}
                  required
                  type="email"
                  placeholder={'Email'}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'password'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="textstyle-input-label">
                <Trans i18nKey={'common:password'} />
              </FormLabel>

              <FormControl>
                <Input
                  required
                  data-test={'password-input'}
                  type="password"
                  placeholder={'Password'}
                  {...field}
                />
              </FormControl>

              <FormMessage />

              {/* <Button
                asChild
                type={'button'}
                size={'sm'}
                variant={'link'}
                className={'text-xs'}
              >
                <Link href={'/auth/password-reset'}>
                  <Trans i18nKey={'auth:passwordForgottenQuestion'} />
                </Link>
              </Button> */}
            </FormItem>
          )}
        />

        <Button
          data-test="auth-submit-button"
          className={'group bg-brand-800 w-full cursor-pointer rounded-[6px]'}
          size="lg"
          type="submit"
          disabled={loading}
        >
          <If
            condition={loading}
            fallback={<Trans i18nKey={'Sign in with Email'} />}
          >
            <Trans i18nKey={'auth:signingIn'} />
          </If>
        </Button>
      </form>
    </Form>
  );
}
