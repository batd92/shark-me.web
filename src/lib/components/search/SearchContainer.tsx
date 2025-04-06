/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { CaretSortIcon, CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import pickBy from 'lodash/pickBy';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFilter } from 'react-icons/fa';

import { INITIAL_VALUES } from '@/lib/components/search/constants';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Checkbox } from '@/lib/components/ui/checkbox';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/lib/components/ui/command';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/lib/components/ui/popover';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { useToast } from '@/lib/components/ui/use-toast';
import type { SearchForm } from '@/lib/models/searchForm';
import { cn } from '@/lib/styles/utils';

import type { SearchContainerProps } from './types';

const SearchContainer = ({ categories }: SearchContainerProps) => {
    const { toast } = useToast();
    const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] =
        React.useState<boolean>(false);

    const form = useForm<SearchForm>({
        defaultValues: INITIAL_VALUES,
        mode: 'onChange',
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { isValid, isDirty },
    } = form;

    const title = watch('queryParams.title');
    const searchButtonDisabled = !isDirty || !isValid || !title;

    const [description, category, https] = watch([
        'queryParams.description',
        'queryParams.category',
        'queryParams.https',
    ]);

    const processSearch = async (values: SearchForm) => {
        const queries = pickBy(values.queryParams);
    };

    const handleReset = () => {
        reset(INITIAL_VALUES);
    };
    const handleSearch = handleSubmit(processSearch);

    return (
        <Form {...form}>
            <div className="mb-4 flex flex-col">
                <div className="flex gap-2">
                    <Input
                        {...register('queryParams.title')}
                        type="text"
                        placeholder="search API name"
                        className="h-12 rounded-3xl font-semibold"
                    />

                    <Popover>
                        <PopoverTrigger>
                            <Button size="icon" aria-label="filter search">
                                <FaFilter />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <h4 className="font-bold">Filter</h4>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        {...register('queryParams.description')}
                                        className="rounded-lg"
                                        type="text"
                                        placeholder="search API description"
                                    />

                                    <FormField
                                        control={control}
                                        name="queryParams.category"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Category</FormLabel>
                                                <Popover
                                                    open={isCategoryPopoverOpen}
                                                    onOpenChange={
                                                        setIsCategoryPopoverOpen
                                                    }
                                                >
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    'justify-between',
                                                                    !field.value &&
                                                                        'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? categories?.find(
                                                                          (
                                                                              categoryOption
                                                                          ) =>
                                                                              categoryOption ===
                                                                              field.value
                                                                      )
                                                                    : 'Select Category'}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search category..."
                                                                className="h-9"
                                                            />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    No category
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    <ScrollArea className="h-[200px]">
                                                                        {categories.map(
                                                                            (
                                                                                categoryItem: string
                                                                            ) => (
                                                                                <CommandItem
                                                                                    value={
                                                                                        categoryItem
                                                                                    }
                                                                                    key={
                                                                                        categoryItem
                                                                                    }
                                                                                    onSelect={() => {
                                                                                        form.setValue(
                                                                                            'queryParams.category',
                                                                                            categoryItem
                                                                                        );
                                                                                        setIsCategoryPopoverOpen(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        categoryItem
                                                                                    }
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            'ml-auto h-4 w-4',
                                                                                            categoryItem ===
                                                                                                field.value
                                                                                                ? 'opacity-100'
                                                                                                : 'opacity-0'
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            )
                                                                        )}
                                                                    </ScrollArea>
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-center">
                                        <FormField
                                            control={control}
                                            name="queryParams.https"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center gap-2 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Support HTTPs
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="mt-2 flex h-8 gap-2">
                    {description ? <Badge>{description}</Badge> : null}
                    {category ? (
                        <Badge className="bg-cyan-500">{category}</Badge>
                    ) : null}
                    {https ? (
                        <Badge className="bg-teal-500">HTTPs</Badge>
                    ) : null}
                </div>
            </div>
        </Form>
    );
};

export default SearchContainer;
