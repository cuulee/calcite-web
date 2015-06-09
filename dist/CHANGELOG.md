## 0.7.0

- General documentation improvements/updates

### Added

- `input-group` component
- `action-bar` component

## 0.6.1

### Added
- Badges

### Modified
- icon font as baked-in padding right

## 0.6.0

### Fixed
- Modals not blurry

### Modified
- `.text-rule` color is now the same as `<hr>`
- `<hr>` elements now have slightly less margin top and bottom
- `sub-nav-title` is no longer floated left (enables larger banner-like subnavs)

### Added
- styled list items by default

### Removed
- `.bulleted-list` removed as bulleted lists are default

## 0.5.2

### Added
- `calcite-web/scss/imports` for all sass with no css

### Modified
- Inputs have small inset box-shadow

### Fixed
- Fonts now included in dist

### Improvements
- Focus states for form controls now consistent

## 0.5.1

### Added
- `.grid-full` for opt-in to 26 column system
- Block groups to 8 up

### Modified
- Default grid behavior centers column-24 on large screen sizes
- Changed edge padding back to .04vw from 0.01.vw

## 0.5.0

### Added
- First version of icon font
- `$font-path` variable for configuration of font folder

### Modified
- Updated Patterns Color dependency to v0.1.1
- Calcite color icons now referenced with `icon-calcite-` and `icon-calcite-large` icon classes

### Removed
- Removed vecticons in favor of icon font

## 0.4.0

### Added
- Social media icons
- `$image-path` variable for configuration of image folder
- `calcite.toggleClass()` exposed on public calcite-web.js api

### Breaking Changes
- removed `calcite.getAttr()` as `Element.getAttribute()` support is IE8+

## 0.3.1

### Improvements
- calcite-web.js patterns can be passed a specific dom node as context when they are initialized.
- Updated JavaScript documentation
- Proper registration as CommonJS module

## 0.3.0

### Improvements
- Removed ~ 230 LOC from calcite-web.js

### Fixed
- Fixed interpolation of variables in the `keyframes` mixin
- Fixed modals always closing on any click if open
- Document modals properly

### Modified
- Increase large breakpoint to 1450px
- add `extra-large-leader-n`
	- trailer
	- padding-leader
	- padding-trailer
- add `extra-large-column-n` to 36 columns
- Remove `container-max` and `container-min`
- `extra-large-hide` and `-only`

### Removed
- remove carousel pattern (will be its own project)

## 0.2.3

### Modified
- Pair Avenir Demi with Avenir Light for default strong
behavior
- Clicking in drawer while drawer is open will not close drawer

### Fixed
- fix dropdowns in IE9

## 0.2.2

### Fixed
- Set avenir face on buttons
- use `https` for font imports
- table rows now have the same `font-weight` as the body
- selects have more right padding

### Added
- Tailcoat migration guide
- Code style guides (CSS, HTML, JS)

### Modified
- Wrap navigation patterns in a `column-24`
- Fix typography documentation

## 0.2.1

### Modified
- `.footer` has default `padding-top`

### Fixed
- Fix tooling for deploy and s3
- Fix problem with font loading

## 0.2.0

### Modified
- tooltips use `aria-label` for tooltip text
- Modify tooltip styles
- Multi-line tooltips
- Custom `select` style

### Removed
- `label.required`

## 0.1.2

### Added
- `files` key in `package.json`

## 0.1.1

### Added
- Color dependency copied out of `node_modules` and into `dist` on release.

### Modified
- `.block` extends new default typeface.

## 0.1.0

### Modified
- `.container` class now `.grid-container`
- Alerts now are colored better, higher z-index, and subtle drop shadow
- Sass now rendered with [grunt-sass](https://github.com/sindresorhus/grunt-sass)
- Panels work with columns
- Avenir Next Light is default body typeface
- Avenir no longer variablized
- `header-face` => `avenir-regular`
- `body-face` => `content-face`

### Added
- third nav hover state
- `label.required`
- `.input-warning`
- `.input-success`
- `.table-blue.table-striped`
- Additional panel options
- ie9 bugfixes
	- .gif fallback for loader component
	- transform2d for drawers, modals


## 0.0.10

### Modified
- Change bold styles on body from Frutiger 65 to Frutiger 55

## 0.0.9

Animations, bug fixes, and general cleanup.

### Modified
- Clicking accordion sections toggles only that accordion
section
- Expanding nav now animates and takes up full screen
- Changed location of the `js-dropdown` class
- Visual changes to user dropdown
- Finessed default type styles for raw markdown
- Modals are more in line with best-practices

### Added
- Blockquote styles
- Sticky footer
- Sub Nav documentation
- Assets uploaded to s3 on release
- Deploy script works from grunt

## 0.0.8

Sample page layouts, typography.

### Added
- Added `esri-logo-condensed` class
- Blog layout
- Homepage layout
- Documentation layout
- Api reference layout
- `.font-size-x`
- `.gutter-left-x` and `.gutter-right-x`

### Modified
- Esri logo modified to fit in navigation better
- Removed `preventDefault` from `bindDrawer()` function.
- Small accordion and tab padding tweaks

## 0.0.7

JavaScript, documentation, and more patterns.

### Added
- Sticky scroll
- Sticky show
- JavScript for interactive patterns
- Invisible class
- Carousel pattern
- `transition-prefixed()` mixin

### Modified
- Minor padding right compression on .top-nav-title
- User nav now a real thing
- Move from Sass to LibSass
- Make default body size larger
- Minor adjustments on font-size at values less than 0
- Alpha counters on nested `ol`
- ITC Charter to Kepler
- Major rework of documentation tech stack

### Removed
- Color Map

## 0.0.6

More documentation, new JavaScript components, working icon tooling prototype.

### Added
- Inline helper class
- Drawers
- Expanding nav
- Search bar component
- User login component
- Esri logo component
- Button group support for all button styles
- `.sign-in` class for sign in + sign out buttons in top nav
- Modals
- Dropdowns

### Modified
- Disabled button style to look less clickable
- Tweak form styles
- Tighten panel padding
- Nav patterns now responsive

## 0.0.5

Forms, table improvements, type changes, in progress icon tooling, more documentation.

### Added
- Inputs
- Selects
- Radio Buttons
- Checkboxes
- Labels
- Legends
- `overflow-auto` - Helper class can wrap elements that break layout
- `input-error` - Outlines an input in red for user feedback

### Modified
- Nav patterns & Buttons no longer default to `.header-light` on retina.
- Buttons have a one pixel stroke
- Change header font of tables to Avenir Next
- Changed body font to Frutiger Light
- Make tables more compact
- Javascript namespace changed from `C` to `calcite`
- Renamed `dom.makeArray()` function to `dom.nodeListToArray`
- Added `arr` and `browser` subsets to `calcite` functions
- Moved `isTouch()` from `dom` to `browser`
- Moved `indexOf` from `dom` to `arr`
- Fixed `hr` border
- Added some usage examples to JS doc
- Copy editing

## 0.0.4

Documentation and small style additions.

### Added
- Favicon
- `img` tags now get max width of 100%
- Typography documentation

## 0.0.3

Additional styles, beginning documentation site.

### Modified
- Change color of border-bottom on third-nav
- Fixed font weight on active third nav link
- Adding structure for documentation

### Added
- `<code>` styles for code blocks and inline code

## 0.0.2

Lots of foundational styles.

### Modified
- Type adjustments

### Added
- Alerts
- Pagination
- Tables
- Tabs
- Modal
- Accordion
- Block Grid
- Code Styles

### Fixes
- Type Helpers Cascade Properly
- Leader-Trailer Helpers Cascade Properly
- Grid troubles

## 0.0.1

Begin foundational sass for the framework.

### Modified
- New grayscale color values

### Added
- Colors
- Type Styles
- Grid
- Sass Utils
- Breadcrumbs

## 0.0.0

### Added
- Documentation Site
- KSS Parser
- CSS Reset
- Grunt Workflows