import Image from 'next/image';

import { ChevronDown, List, Phone, Users } from 'lucide-react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@kit/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { cn } from '@kit/ui/utils';

interface PropertyCardProps {
  imageUrl: string;
  label?: string;
  headline: string;
  description: string;
  className?: string;
}

export function PropertyCard({
  imageUrl,
  label,
  headline,
  description,
  className,
}: PropertyCardProps) {
  return (
    <Card
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-sm',
        className,
      )}
    >
      <div className="relative">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={imageUrl || '/placeholder.svg?height=300&width=400'}
            alt={headline}
            fill
            objectFit="cover"
          />
        </div>
        {label && (
          <Badge className="bg-brand-800 hover:bg-brand-900 absolute top-4 right-3 rounded-full px-4 py-1 text-xs font-medium text-white">
            {label}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-md text-brand-slate-800 font-semibold">
          {headline}
        </h3>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-slate-500">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5 pt-2">
        <Button className="bg-brand-800 hover:bg-brand-900 flex-1 cursor-pointer rounded-[6px] text-white">
          Create Batch
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-brand-800 text-brand-800 flex-1 rounded-[6px]"
            >
              Jump to <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-56 rounded-[6px] p-3"
          >
            <DropdownMenuItem className="cursor-pointer text-sm text-slate-800">
              <List className="mr-2 h-4 w-4" />
              Batches
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm text-slate-800">
              <Phone className="mr-2 h-4 w-4" />
              Calls
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm text-slate-800">
              <Users className="mr-2 h-4 w-4" />
              Contacts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
