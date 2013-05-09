Templates are fetched as:

GET /template/<template_id>

template_id naming convention: <template_type>_<user_name>_<template_name>

See PB::Template.templateIdToFile for further documentation
on how are templates interpreted.

Template design notes:

template.js is the name of template definition file. See docs/template.js for example

SVG images should be defined with width/height/viewbox/preserveAspectRatio.
They will not work on ipad otherwise. Ex:
<svg width="1150px" height="720px" viewBox="0 0 1150 720" preserveAspectRatio="none">
