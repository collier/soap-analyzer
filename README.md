# Soap Analyzer

[Download at Chrome Web Store](http://goo.gl/RaXqW0)

A developer tools chrome extension which allows users to easily track any SOAP HTTP requests that are made by the browser. It's meant to act as the Network tab, but only for SOAP HTTP traffic, currently has ~3,500 actively weekly users. It includes the following features:

- Display list of SOAP web service calls made by service name instead of by URL.
- Parses XML request and response of each web service call, and displays them in an [text editor](https://ace.c9.io/) with collapsible nodes and syntax highlighting.
- Ability to toggle Envelope, Header, and Body tags, to allow users to focus on content of requests and responses.
- Ability to toggle 'xmlns' flavored properties on XML nodes to de-clutter and improve readability.
- Dark and Default color schemes to match those available in the Chrome dev tools.

## Demo

![Demo](https://i.imgur.com/9DxRc1n.gif)

## Installation and Development

Soap Analyzer is built using webpack, clone the repo, run `npm install`, then run `npm start` to launch to dev environment which watches for file changes and rebuilds. The build folder can be loaded as an unpacked extesion by visiting the [extensions page](chrome://extensions/) in Chrome.

Running `npm build` will create a zip file in a `./packages` directory, which is deployable to the Chrome Web Store.

## Support for other browsers

Currently, the extension is only published in the Chrome Web Store. I am always welcome to pull requests which add support for other browsers! :smiley:

## License

MIT License
