# Coding conventions and structure

TL;DR: Enable prettier auto formatting in VSCode and you are good to go.

## Auto formatting

- Use prettier to auto format code
- Unless anything else is decided, use `.prettierrc.js`, for sensible default configuration
- Make sure you have Prettier VSCode extension installed and active

## Naming conventions

- **PascalCase** for components, interfaces and classes. Example: `DatePicker.tsx` or `Car.ts`
- **PascalCase** with dot descriptor for styles and stories. Example: `DatePicker.styles.ts` or `DatePicker.stories.tsx`
- Dash case and/or dot case (not sure what this is called?) for other files. Example: `file.utils.ts` or `foo-bar.config.ts`
- Extract styling to its own file, do not do inline styling unless it is really needed.

## Directory structure

Not set in stone, but aim for this so next developer can easily navigate in code base.

```
components/                 # all reusable components
components/DatePicker/      # keep component in their own
                            # folder which holds component,
                            # styles, stories and possibly more files
screens/                    # app screens/views
models/                     # models, such as API models or other, should mostly be interfaces
config/                     # config files
ci/                         # pipeline yaml files
assets/                     # static assets such as images
theme/                      # global app theme/styling constants
```
