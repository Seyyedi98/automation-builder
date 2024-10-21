"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { X } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options, groupBy) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return { "": options };
  }

  const groupOption = {};
  options.forEach((option) => {
    const key = option[groupBy] || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    );
  }
  return cloneOption;
}

const CommandEmpty = forwardRef(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(value || []);
    const [options, setOptions] = useState(
      transToGroupOption(defaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current,
      }),
      [selected]
    );

    const handleUnselect = useCallback(
      (option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [selected]
    );

    const handleKeyDown = useCallback(
      (e) => {
        const input = inputRef.current;
        if (input) {
          if (
            (e.key === "Delete" || e.key === "Backspace") &&
            input.value === "" &&
            selected.length > 0
          ) {
            handleUnselect(selected[selected.length - 1]);
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [selected]
    );

    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      if (!arrayOptions || onSearch) return;
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [defaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;
        if (triggerSearchOnFocus) {
          await doSearch();
        }
        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
    }, [debouncedSearchTerm, open]);

    const CreatableItem = () => {
      if (!creatable) return null;

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >{`Create "${inputValue}"`}</CommandItem>
      );

      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return null;
    };

    const EmptyItem = useCallback(() => {
      if (!emptyIndicator) return null;

      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = useMemo(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    const commandFilter = useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value, search) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }

      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <Command
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          "overflow-visible bg-transparent",
          commandProps?.className
        )}
        shouldFilter={
          commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch
        }
        filter={commandFilter()}
      >
        <div
          className={cn(
            "group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => (
              <Badge
                key={option.value}
                className={cn(
                  "data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground",
                  "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground",
                  badgeClassName
                )}
                data-fixed={option.fixed}
                data-disabled={disabled}
              >
                {option.label}
                <button
                  className={cn(
                    "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    (disabled || option.fixed) && "hidden"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
                inputProps?.onValueChange?.(value);
              }}
              onBlur={(event) => {
                setOpen(false);
                inputProps?.onBlur?.(event);
              }}
              onFocus={(event) => {
                setOpen(true);
                triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                inputProps?.onFocus?.(event);
              }}
              placeholder={
                hidePlaceholderWhenSelected && selected.length !== 0
                  ? ""
                  : placeholder
              }
              className={cn(
                "ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                inputProps?.className
              )}
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && (
            <CommandList className={cn("shadow", !open && "hidden")}>
              <CommandEmpty className="relative">
                <div>{isLoading ? loadingIndicator : <EmptyItem />}</div>
              </CommandEmpty>
              {Object.entries(selectables).map(([groupLabel, items]) => (
                <CommandGroup key={groupLabel} heading={groupLabel}>
                  {items.map((item, index) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      className="cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        if (selected.length >= maxSelected) {
                          onMaxSelected?.(selected.length);
                          return;
                        }
                        setInputValue("");
                        const newOptions = [...selected, item];
                        setSelected(newOptions);
                        onChange?.(newOptions);
                      }}
                      {...(index === 0 &&
                        selectFirstItem && { autoFocus: true })}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CreatableItem />
            </CommandList>
          )}
        </div>
      </Command>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";

export default MultipleSelector;
