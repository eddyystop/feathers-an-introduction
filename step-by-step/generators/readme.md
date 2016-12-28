# Generators

We've been writing code "by hand" till now in order to understand how basic Feathers works.
We will now start using Feathers generators since we have the background to understand what they produce.

Generators are useful to

- **Eliminate boilerplate.**
We've seen that Feathers, even when coded "by hand",
eliminates the majority of the boilerplate for a CRUD project.
Generators will eliminate even more.

> **Generators**
Feathers generators generate very little code because Feathers is so succinct.
You can easily understand the generated code because its no different from what we've been
coding so far "by hand".
Some other frameworks make things “seem” easy by generating thousands of lines of code for you
and in the process making it almost impossible to implement anything not supported out of the box
by their generators.

- **Organize your app.**
The generated modules are structured as recommended by the Feathers team.
So you don't have to worry about how to organize your files.

- **Handle database specifics.**
The generators will generate code for different databases.
So you don't have to investigate how to do so.

## Install generators

You can install the Feathers generators with

`npm install -g feathers-cli`
