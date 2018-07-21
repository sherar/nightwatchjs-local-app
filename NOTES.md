# Notes

## Application Under Test issues:

- UI elements don't have a unique ID and any text changes could break the tests. It's recommended to have unique IDs for each element to avoid this possible problem.
- Pager doesn't work so there's no need to test this functionality

## Necesary items to test:

- Make sure see employees home town is shown
- Make sure selected employees list is updated after clicking view selected data

## Testing Framework notes:

- Used XPATH because many elements were unavailable to be declared with CSS. Note: CSS is faster and more browser-compatible over XPATH so by adding unique IDs this could be avoided.
- Used xPath() to avoid code duplication.
