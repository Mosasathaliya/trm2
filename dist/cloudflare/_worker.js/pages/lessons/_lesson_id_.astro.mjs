globalThis.process ??= {}; globalThis.process.env ??= {};
import { o as objectType, s as stringType, a as arrayType, n as numberType, b as booleanType, e as enumType, c as createComponent, d as createAstro, r as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BTyQwOK9.mjs';
import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, b as cva, C as Card, d as CardHeader, e as CardTitle, B as BookOpenText, f as CardContent, g as createContextScope, u as useControllableState, h as useId, P as Primitive, i as composeEventHandlers, k as Presence, l as useComposedRefs, m as useLayoutEffect2, n as createCollection, o as useDirection, p as ChevronDown, L as Lightbulb, r as runAi, R as RadioGroup, q as RadioGroupItem, s as Label, t as CircleCheckBig, v as CircleX, w as CardFooter, x as Button, y as LoaderCircle, A as Alert, z as AlertTitle, D as AlertDescription, E as Award, F as Dialog, G as DialogContent, H as DialogHeader, I as DialogTitle, J as DialogDescription, T as Textarea, K as DialogFooter, S as Send, M as Link, N as generateText, O as getAiCostEstimate, Q as AI_MODELS, U as translateText, $ as $$Layout, V as lessons } from '../../chunks/translate-flow_CLdcbQxa.mjs';
import { a as reactExports, R as React } from '../../chunks/_@astro-renderers_CwoFMiqm.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CwoFMiqm.mjs';

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("ArrowLeft", __iconNode$5);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$4 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const MessageCircleQuestion = createLucideIcon("MessageCircleQuestion", __iconNode$4);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$3 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  [
    "path",
    {
      d: "M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8",
      key: "1blaws"
    }
  ]
];
const MessageSquareHeart = createLucideIcon("MessageSquareHeart", __iconNode$3);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
const MessageSquarePlus = createLucideIcon("MessageSquarePlus", __iconNode$2);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("StickyNote", __iconNode$1);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("TriangleAlert", __iconNode);

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

const LessonHeader = ({ title, topic, level }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-primary mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: topic }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: level === "Beginner" ? "default" : level === "Intermediate" ? "outline" : "destructive",
          className: level === "Beginner" ? "bg-accent text-accent-foreground" : level === "Intermediate" ? "border-accent text-accent-foreground" : "bg-orange-500 text-white",
          children: level
        }
      )
    ] })
  ] });
};

const ArabicExplanation = ({ explanation }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center text-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpenText, { className: "mr-2 h-6 w-6 text-primary" }),
      "Explanation (الشرح)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed whitespace-pre-line text-right", dir: "rtl", children: explanation }) })
  ] });
};

var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;

var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: value ? [value] : [],
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      triggerCollection[clampedIndex].ref.current?.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;

const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;

const LessonExamples = ({ examples }) => {
  if (!examples || examples.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center text-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "mr-2 h-6 w-6 text-primary" }),
      "Examples (أمثلة)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full", defaultValue: "item-0", children: examples.map((example, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${index}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionTrigger, { className: "text-lg hover:no-underline", children: [
        "Example ",
        index + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "English:" }),
          " ",
          example.english.split("*").map((part, i) => i % 2 === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-accent", children: part }, i) : part)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-md text-right", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold ml-1", children: ":عربي" }),
          " ",
          example.arabic.split("*").map((part, i) => i % 2 === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-accent", children: part }, i) : part)
        ] })
      ] }) })
    ] }, index)) }) })
  ] });
};

const AdditionalNotes = ({ notes, notesArabic }) => {
  if (!notes && !notesArabic) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-lg border-primary/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { as: "h3", className: "flex items-center text-2xl text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "mr-2 h-6 w-6" }),
      "Additional Notes (ملاحظات إضافية)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "item-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-lg hover:no-underline", children: "Toggle Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { children: [
        notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md leading-relaxed whitespace-pre-line", children: notes }) }),
        notesArabic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md font-semibold text-primary/90 mb-1", children: "(بالعربية)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md leading-relaxed whitespace-pre-line text-right", dir: "rtl", children: notesArabic })
        ] })
      ] })
    ] }) }) })
  ] });
};

const CommonMistakes = ({ mistakes, mistakesArabic }) => {
  if (!mistakes && !mistakesArabic) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { as: "h3", className: "flex items-center text-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-2 h-6 w-6 text-destructive" }),
      "Common Mistakes (أخطاء شائعة)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "item-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-lg hover:no-underline", children: "Toggle Mistakes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { children: [
        mistakes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md leading-relaxed whitespace-pre-line", children: mistakes }) }),
        mistakesArabic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md font-semibold text-destructive/90 mb-1", children: "(بالعربية)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-md leading-relaxed whitespace-pre-line text-right", dir: "rtl", children: mistakesArabic })
        ] })
      ] })
    ] }) }) })
  ] });
};

objectType({
  lessonTitle: stringType().describe("The title of the lesson."),
  lessonTopic: stringType().describe("The topic of the lesson."),
  lessonLevel: stringType().describe("The level of the lesson (e.g., Beginner, Intermediate, Advanced)."),
  lessonArabicExplanation: stringType().describe("The Arabic explanation of the lesson."),
  lessonExamples: arrayType(
    objectType({
      english: stringType().describe("The English example."),
      arabic: stringType().describe("The Arabic translation of the example."),
      imagePrompt: stringType().optional(),
      imageUrl: stringType().optional()
    })
  ).describe("Examples provided in the lesson."),
  lessonInteractiveExercises: arrayType(
    objectType({
      type: stringType().describe("The type of the exercise (e.g., multiple_choice)."),
      question: stringType().describe("The question of the exercise."),
      choices: arrayType(stringType()).optional().describe("The choices for the multiple-choice question."),
      correct_answer: stringType().describe("The correct answer to the exercise."),
      user_answer: stringType().describe("The user provided answer to the exercise.")
    })
  ).describe("Interactive exercises in the lesson."),
  lessonAdditionalNotes: stringType().optional().describe("Additional notes for the lesson."),
  lessonCommonMistakes: stringType().optional().describe("Common mistakes students make in the lesson."),
  lessonAdditionalNotesArabic: stringType().optional().describe("Additional notes for the lesson in Arabic."),
  lessonCommonMistakesArabic: stringType().optional().describe("Common mistakes students make in the lesson in Arabic.")
});
async function getExerciseFeedback(input) {
  const { lessonTitle, lessonTopic, lessonLevel, lessonArabicExplanation, lessonExamples, lessonInteractiveExercises, lessonAdditionalNotesArabic, lessonCommonMistakesArabic } = input;
  const examplesText = lessonExamples.map((ex) => `- English: "${ex.english}", Arabic: "${ex.arabic}"`).join("\n");
  const prompt = `You are an expert AI English language tutor from Speed of Mastery.
Your primary language for providing feedback to students MUST be natural-sounding, clear, and encouraging ARABIC. You can use English for specific grammar terms if necessary, but all explanations and clarifications should be in Arabic.

The student is currently working on a lesson titled "${lessonTitle}" on the topic of "${lessonTopic}" at the "${lessonLevel}" level.
Here is the core lesson content (in Arabic):
Explanation: "${lessonArabicExplanation}"
Examples:
${examplesText}
Additional Notes: "${lessonAdditionalNotesArabic || "None"}"
Common Mistakes: "${lessonCommonMistakesArabic || "None"}"

Now, consider the following exercise and the student's answer:
Question: "${lessonInteractiveExercises[0].question}"
Correct Answer: "${lessonInteractiveExercises[0].correct_answer}"
Student's Answer: "${lessonInteractiveExercises[0].user_answer}"

Your task is to provide targeted feedback to the student IN ARABIC.
- If the student's answer is correct, congratulate them in Arabic. You can also offer a small additional tip or encouragement in Arabic to reinforce their learning.
- If the student's answer is incorrect, gently explain IN ARABIC why it's incorrect. Clarify the correct answer IN ARABIC and, if possible, reference the lesson material (like the Arabic explanation or examples) to help them understand. Be encouraging and helpful.

Ensure your entire feedback is in ARABIC. Your response should consist ONLY of the feedback text itself. Do not add any extra text like "Here is the feedback:".`;
  const messages = [{ role: "user", content: prompt }];
  const response = await runAi({ model: "@cf/meta/llama-3-8b-instruct", inputs: { messages } });
  const jsonResponse = await response.json();
  const feedback = jsonResponse.result.response;
  return { feedback };
}

const MultipleChoiceExercise = ({ exercise, lesson, onCorrect }) => {
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const [isCorrect, setIsCorrect] = reactExports.useState(null);
  const [aiFeedback, setAiFeedback] = reactExports.useState(null);
  const [isLoading, startTransition] = reactExports.useTransition();
  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    const correct = selectedAnswer === exercise.correct_answer;
    setIsCorrect(correct);
    if (correct) {
      onCorrect();
    }
    startTransition(async () => {
      try {
        const feedbackInput = {
          lessonTitle: lesson.title,
          lessonTopic: lesson.topic,
          lessonLevel: lesson.level,
          lessonArabicExplanation: lesson.arabic_explanation,
          lessonExamples: lesson.examples,
          lessonInteractiveExercises: [{
            type: exercise.type,
            question: exercise.question,
            choices: exercise.choices,
            correct_answer: exercise.correct_answer,
            user_answer: selectedAnswer
          }],
          lessonAdditionalNotes: lesson.additional_notes,
          lessonCommonMistakes: lesson.common_mistakes,
          lessonAdditionalNotesArabic: lesson.additional_notes_arabic,
          lessonCommonMistakesArabic: lesson.common_mistakes_arabic
        };
        const feedbackResponse = await getExerciseFeedback(feedbackInput);
        setAiFeedback(feedbackResponse.feedback);
      } catch (error) {
        console.error("Error fetching AI feedback:", error);
        setAiFeedback("عذرًا، لم أتمكن من الحصول على الملاحظات في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    });
  };
  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setAiFeedback(null);
  };
  const getChoiceStyle = (choice) => {
    if (!isSubmitted) return "";
    if (choice === exercise.correct_answer) return "text-green-600 dark:text-green-400 font-semibold";
    if (choice === selectedAnswer && choice !== exercise.correct_answer) return "text-destructive font-semibold";
    return "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-4 shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: exercise.question }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroup,
      {
        value: selectedAnswer ?? "",
        onValueChange: setSelectedAnswer,
        disabled: isSubmitted,
        className: "space-y-3",
        children: exercise.choices.map((choice, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: choice, id: `${exercise.question}-choice-${index}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${exercise.question}-choice-${index}`, className: `text-md cursor-pointer ${getChoiceStyle(choice)}`, children: [
            choice,
            isSubmitted && choice === exercise.correct_answer && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "inline ml-2 h-5 w-5 text-green-600 dark:text-green-400" }),
            isSubmitted && choice === selectedAnswer && choice !== exercise.correct_answer && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "inline ml-2 h-5 w-5 text-destructive" })
          ] })
        ] }, index))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col items-start space-y-4", children: [
      !isSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSubmit, disabled: !selectedAnswer || isLoading, className: "w-full sm:w-auto", children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
        "Check Answer"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleReset, variant: "outline", className: "w-full sm:w-auto", children: "Try Again" }),
      isSubmitted && isCorrect !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: isCorrect ? "default" : "destructive", className: isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-700" : "", children: [
        isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { className: isCorrect ? "text-green-700 dark:text-green-300" : "text-destructive-foreground", children: isCorrect ? "Correct! (صحيح!)" : "Incorrect. (غير صحيح.)" }),
        !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
          "The correct answer is (الإجابة الصحيحة هي): ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: exercise.correct_answer })
        ] })
      ] }),
      isLoading && !aiFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Getting feedback from AI tutor... (جاري الحصول على تقييم المعلم الذكي...)" })
      ] }),
      aiFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "default", className: "mt-4 border-accent bg-accent/10 dark:bg-accent/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareHeart, { className: "h-5 w-5 text-primary" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { className: "text-accent-foreground", children: "AI Tutor Feedback (تقييم المعلم الذكي)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-accent-foreground/80 whitespace-pre-line text-right", dir: "rtl", children: aiFeedback })
      ] })
    ] })
  ] });
};

const InteractiveExercisesSection = ({ exercises, lesson, onCorrectAnswer, hasPassed }) => {
  if (!exercises || exercises.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center text-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleQuestion, { className: "mr-2 h-6 w-6 text-primary" }),
      "Interactive Exercises (تمارين تفاعلية)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      hasPassed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "default", className: "mb-6 border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-green-600 dark:text-green-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { className: "text-green-700 dark:text-green-300", children: "Congratulations! (تهانينا!)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
          "You've passed this lesson's exercises! Feel free to keep practicing.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dir: "rtl", className: "block", children: "لقد نجحت في تمارين هذا الدرس! يمكنك الاستمرار في الممارسة." })
        ] })
      ] }),
      exercises.map((exercise, index) => {
        if (exercise.type === "multiple_choice") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(MultipleChoiceExercise, { exercise, lesson, onCorrect: onCorrectAnswer }, index);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Unsupported exercise type: ",
          exercise.type
        ] }, index);
      })
    ] })
  ] });
};

objectType({
  studentQuestion: stringType().describe("The question asked by the student."),
  lessonTitle: stringType().describe("The title of the lesson."),
  lessonTopic: stringType().describe("The topic of the lesson."),
  lessonLevel: stringType().describe("The level of the lesson (e.g., Beginner, Intermediate, Advanced)."),
  lessonArabicExplanation: stringType().describe("The Arabic explanation of the lesson."),
  lessonExamples: arrayType(
    objectType({
      english: stringType().describe("The English example."),
      arabic: stringType().describe("The Arabic translation of the example."),
      imagePrompt: stringType().optional(),
      imageUrl: stringType().optional()
    })
  ).describe("Examples provided in the lesson."),
  lessonAdditionalNotesArabic: stringType().optional().describe("Additional notes for the lesson in Arabic."),
  lessonCommonMistakesArabic: stringType().optional().describe("Common mistakes students make in the lesson in Arabic.")
});
async function getLessonTutorResponse(input) {
  const { studentQuestion, lessonTitle, lessonTopic, lessonArabicExplanation, lessonExamples, lessonAdditionalNotesArabic, lessonCommonMistakesArabic } = input;
  const examplesText = lessonExamples.map((ex) => `- English: "${ex.english}", Arabic: "${ex.arabic}"`).join("\n");
  const systemPrompt = `You are a specialist AI English language tutor from Speed of Mastery, fluent in English and Arabic.
Your entire response MUST be in natural, helpful, and encouraging Arabic.
Your personality is patient and supportive.`;
  const userPrompt = `You are tutoring a student on an English lesson.
Lesson Title: "${lessonTitle}"
Topic: "${lessonTopic}"
Level: "${level}"

Here is the core lesson material (in Arabic) you must use to answer the question:
---
Lesson Explanation: "${lessonArabicExplanation}"
---
Lesson Examples:
${examplesText}
---
Additional Notes: "${lessonAdditionalNotesArabic || "None"}"
---
Common Mistakes: "${lessonCommonMistakesArabic || "None"}"
---

The student's question is: "${studentQuestion}"

Your task is to provide a clear, helpful, and concise answer to the student's question **in Arabic only**.
- Base your answer on the lesson material provided.
- If it helps, refer to the lesson explanation or examples to clarify your answer.
- If the student's question is unclear, politely ask for clarification in Arabic, but try to provide a helpful answer first if possible.
- Your response should be complete and ready to display directly to the student. Do not add any extra conversational text like "Here is the answer". Just provide the answer itself.`;
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];
  const response = await runAi({ model: "@cf/meta/llama-3-8b-instruct", inputs: { messages } });
  const jsonResponse = await response.json();
  const aiTutorResponse = jsonResponse.result.response;
  return { aiTutorResponse };
}

const LessonTutorModal = ({ isOpen, onClose, lesson }) => {
  const [studentQuestion, setStudentQuestion] = reactExports.useState("");
  const [aiResponse, setAiResponse] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [isLoading, startTransition] = reactExports.useTransition();
  const handleSubmitQuestion = async () => {
    if (!studentQuestion.trim()) return;
    setError(null);
    setAiResponse(null);
    startTransition(async () => {
      try {
        const tutorInput = {
          studentQuestion,
          lessonTitle: lesson.title,
          lessonTopic: lesson.topic,
          lessonLevel: lesson.level,
          lessonArabicExplanation: lesson.arabic_explanation,
          lessonExamples: lesson.examples.map((ex) => ({
            english: ex.english,
            arabic: ex.arabic,
            imagePrompt: ex.imagePrompt,
            imageUrl: ex.imageUrl
          })),
          lessonAdditionalNotesArabic: lesson.additional_notes_arabic,
          lessonCommonMistakesArabic: lesson.common_mistakes_arabic
        };
        const response = await getLessonTutorResponse(tutorInput);
        setAiResponse(response.aiTutorResponse);
      } catch (err) {
        console.error("Error fetching AI tutor response:", err);
        setError("عذرًا، لم أتمكن من الحصول على رد من المعلم الذكي في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.");
        setAiResponse(null);
      }
    });
  };
  const handleClose = () => {
    setStudentQuestion("");
    setAiResponse(null);
    setError(null);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[600px] flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center text-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareHeart, { className: "mr-2 h-6 w-6 text-primary" }),
        "AI Lesson Tutor (مساعد الدرس الذكي)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { dir: "rtl", className: "text-right", children: "اطرح سؤالاً حول هذا الدرس، وسيقوم المعلم الذكي بمساعدتك على فهمه بشكل أفضل. اكتب سؤالك باللغة العربية أو الإنجليزية." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow overflow-y-auto space-y-4 p-1 pr-3", children: [
      aiResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "default", className: "border-accent bg-accent/10 dark:bg-accent/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareHeart, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { className: "text-accent-foreground", children: "AI Tutor's Response (رد المعلم الذكي)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-accent-foreground/90 whitespace-pre-line text-right", dir: "rtl", children: aiResponse })
      ] }),
      isLoading && !aiResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-muted-foreground p-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري الحصول على رد من المعلم الذكي..." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "Error (خطأ)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 pt-4 border-t", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          placeholder: "اكتب سؤالك هنا... (Type your question here...)",
          value: studentQuestion,
          onChange: (e) => setStudentQuestion(e.target.value),
          className: "min-h-[80px] text-base",
          rows: 3,
          dir: studentQuestion.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: handleClose, className: "w-full sm:w-auto", children: "Close (إغلاق)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSubmitQuestion, disabled: isLoading || !studentQuestion.trim(), className: "w-full sm:w-auto", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
          "Ask AI Tutor (اسأل المعلم الذكي)"
        ] })
      ] })
    ] })
  ] }) });
};

const LessonDisplay = ({ lesson }) => {
  const [isTutorModalOpen, setIsTutorModalOpen] = reactExports.useState(false);
  const [hasPassedExercises, setHasPassedExercises] = reactExports.useState(false);
  const handleCorrectAnswer = () => {
    if (!hasPassedExercises) {
      setHasPassedExercises(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 relative pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LessonHeader, { title: lesson.title, topic: lesson.topic, level: lesson.level }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArabicExplanation, { explanation: lesson.arabic_explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LessonExamples, { examples: lesson.examples }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InteractiveExercisesSection,
      {
        exercises: lesson.interactive_exercises,
        lesson,
        onCorrectAnswer: handleCorrectAnswer,
        hasPassed: hasPassedExercises
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdditionalNotes, { notes: lesson.additional_notes, notesArabic: lesson.additional_notes_arabic }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommonMistakes, { mistakes: lesson.common_mistakes, mistakesArabic: lesson.common_mistakes_arabic }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => setIsTutorModalOpen(true),
        className: "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 p-0",
        "aria-label": "Open AI Lesson Tutor",
        size: "icon",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "h-7 w-7" })
      }
    ),
    isTutorModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LessonTutorModal,
      {
        isOpen: isTutorModalOpen,
        onClose: () => setIsTutorModalOpen(false),
        lesson
      }
    )
  ] });
};

function LessonClientComponent({ lesson }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { href: "/", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "All Lessons"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LessonDisplay, { lesson })
  ] });
}

objectType({
  grammarTopic: stringType().describe("The specific English grammar topic to be explained."),
  level: stringType().describe("The level of the student (e.g., Beginner, Intermediate)."),
  language: enumType(["en", "ar"]).default("ar").describe("Target language for the explanation."),
  includeExamples: booleanType().default(true).describe("Whether to include practical examples."),
  includeExercises: booleanType().default(false).describe("Whether to include practice exercises."),
  maxTokens: numberType().default(800).describe("Maximum tokens for the response.")
});
async function generateArabicExplanation(input) {
  const {
    grammarTopic,
    level,
    language = "ar",
    includeExamples = true,
    includeExercises = false,
    maxTokens = 800
  } = input;
  if (typeof window !== "undefined") {
    return {
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. سيتم تحديث هذا المحتوى عند التشغيل.`,
      model_used: "placeholder",
      estimated_cost: 0,
      generation_time: 0
    };
  }
  const startTime = Date.now();
  try {
    const explanationPrompt = `Create a comprehensive explanation of the English grammar topic "${grammarTopic}" for ${level} level students.
    
    The explanation should:
    - Be clear and easy to understand
    - Include the basic concept and rules
    - Provide practical usage guidelines
    - Be suitable for the specified level
    - Include key points and tips
    
    ${includeExamples ? "Include 3-5 practical examples showing correct usage." : ""}
    ${includeExercises ? "Include 2-3 simple practice exercises with answers." : ""}
    
    Make it engaging and educational.`;
    const englishExplanation = await generateText(explanationPrompt, {
      maxTokens: Math.floor(maxTokens * 0.6),
      temperature: 0.4,
      useFallback: true
    });
    let arabicExplanation = englishExplanation;
    if (language === "ar") {
      const translationPrompt = `Translate this English grammar explanation to Arabic: "${englishExplanation}"
      
      Make sure the Arabic translation:
      - Is natural and fluent
      - Uses appropriate Arabic grammar terminology
      - Maintains the educational tone
      - Is suitable for Arabic-speaking learners`;
      arabicExplanation = await generateText(translationPrompt, {
        maxTokens: Math.floor(maxTokens * 0.4),
        temperature: 0.3,
        useFallback: true
      });
    }
    let examples = [];
    if (includeExamples) {
      const examplesPrompt = `Generate 3-5 practical examples for the grammar topic "${grammarTopic}" at ${level} level.
      
      Each example should:
      - Demonstrate the grammar rule clearly
      - Be relevant to everyday situations
      - Include both positive and negative examples
      - Be appropriate for the student's level`;
      const examplesResponse = await generateText(examplesPrompt, {
        maxTokens: 300,
        temperature: 0.6,
        useFallback: true
      });
      examples = examplesResponse.split("\n").filter((line) => line.trim()).map((line) => line.replace(/^[-•]\s*/, "")).slice(0, 5);
    }
    let exercises = [];
    if (includeExercises) {
      const exercisesPrompt = `Create 2-3 simple practice exercises for the grammar topic "${grammarTopic}" at ${level} level.
      
      Each exercise should:
      - Test understanding of the grammar rule
      - Be appropriate for the student's level
      - Include clear instructions
      - Have a definite correct answer
      - Include an explanation of why it's correct`;
      const exercisesResponse = await generateText(exercisesPrompt, {
        maxTokens: 400,
        temperature: 0.4,
        useFallback: true
      });
      exercises = exercisesResponse.split("\n\n").filter((section) => section.trim()).slice(0, 3);
    }
    const totalTokens = (englishExplanation.length + arabicExplanation.length) / 4;
    const estimatedCost = getAiCostEstimate(AI_MODELS.TEXT_GENERATION.LLAMA_3_8B, totalTokens, totalTokens);
    const generationTime = Date.now() - startTime;
    return {
      arabicExplanation,
      englishExplanation: language === "en" ? englishExplanation : void 0,
      examples: examples.length > 0 ? examples : void 0,
      exercises: exercises.length > 0 ? exercises : void 0,
      model_used: AI_MODELS.TEXT_GENERATION.LLAMA_3_8B,
      estimated_cost: estimatedCost.estimatedCost,
      generation_time: generationTime
    };
  } catch (error) {
    console.error("Enhanced lesson content generation failed:", error);
    return {
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. حدث خطأ في توليد المحتوى.`,
      model_used: "fallback",
      estimated_cost: 0,
      generation_time: Date.now() - startTime
    };
  }
}

const $$Astro = createAstro();
async function getStaticPaths() {
  return lessons.map((lesson) => ({
    params: { lesson_id: lesson.lesson_id },
    props: { lesson }
  }));
}
const $$lessonId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lessonId;
  const { lesson } = Astro2.props;
  let enhancedLesson = JSON.parse(JSON.stringify(lesson));
  try {
    const [
      explanationResponse,
      translatedExamples,
      translatedNotes,
      translatedMistakes
    ] = await Promise.all([
      generateArabicExplanation({
        grammarTopic: lesson.meta?.englishGrammarTopic || lesson.title,
        level: lesson.level
      }),
      Promise.all(lesson.examples.map(async (ex) => {
        const [translatedEnglish, translatedArabic] = await Promise.all([
          translateText({ text: ex.english, targetLanguage: "ar", sourceLanguage: "en" }),
          translateText({ text: ex.arabic, targetLanguage: "ar", sourceLanguage: "en" })
        ]);
        return {
          english: ex.english,
          arabic: translatedArabic.translation,
          imagePrompt: ex.imagePrompt
        };
      })),
      lesson.additional_notes ? translateText({ text: lesson.additional_notes, targetLanguage: "ar", sourceLanguage: "en" }) : Promise.resolve(null),
      lesson.common_mistakes ? translateText({ text: lesson.common_mistakes, targetLanguage: "ar", sourceLanguage: "en" }) : Promise.resolve(null)
    ]);
    enhancedLesson.arabic_explanation = explanationResponse.arabicExplanation;
    enhancedLesson.examples = translatedExamples;
    enhancedLesson.additional_notes_arabic = translatedNotes?.translation;
    enhancedLesson.common_mistakes_arabic = translatedMistakes?.translation;
  } catch (error) {
    console.error("Failed to generate or translate lesson content:", lesson.lesson_id, error);
    const topic = lesson.meta?.englishGrammarTopic || lesson.title;
    enhancedLesson.arabic_explanation = `\u0634\u0631\u062D \u0645\u0624\u0642\u062A \u0644\u0645\u0648\u0636\u0648\u0639 "${topic}" \u0644\u0644\u0645\u0633\u062A\u0648\u0649 ${lesson.level}. \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644.`;
    enhancedLesson.examples = lesson.examples.map((ex) => ({
      ...ex,
      arabic: "\u0645\u062B\u0627\u0644 \u0645\u0624\u0642\u062A - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644"
    }));
    enhancedLesson.additional_notes_arabic = "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0624\u0642\u062A\u0629 - \u0633\u062A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644";
    enhancedLesson.common_mistakes_arabic = "\u0623\u062E\u0637\u0627\u0621 \u0634\u0627\u0626\u0639\u0629 \u0645\u0624\u0642\u062A\u0629 - \u0633\u062A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${enhancedLesson.title} - Learn English` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LessonClientComponent", LessonClientComponent, { "lesson": enhancedLesson, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/components/lesson/LessonClientComponent", "client:component-export": "default" })} ` })}`;
}, "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/lessons/[lesson_id].astro", void 0);

const $$file = "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/lessons/[lesson_id].astro";
const $$url = "/lessons/[lesson_id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$lessonId,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
