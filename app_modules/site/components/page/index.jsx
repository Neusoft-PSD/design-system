/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';

const INTERNAL_LOCALYTICS_ID = '3a008518ae1f97363637cd4-f1aff88c-e404-11e4-ad48-005cf8cbabd8';
const EXTERNAL_LOCALYTICS_ID = '2a6dc90c85e5991e50f752a-f8539a44-1e85-11e5-44ef-006918dcf667';
import globals from 'app_modules/global';

class Page extends React.Component {

  render() {
    return (
      <html lang="en">
        {this.renderHead()}
        {this.renderBody()}
      </html>
    );
  }

  renderHead() {
    return (
      <head>
        <title>{this.props.title}</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicons/favicon-194x194.png" sizes="194x194" />
        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicons/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Design System" />
        <meta name="application-name" content="Design System" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        {this.renderStyles()}
        {/* this.renderLocalytics() */}

      </head>
    );
  }

  renderLocalytics() {
    return <script dangerouslySetInnerHTML={{__html: `
      function getLLId(){ return (document.cookie.indexOf('usertype=external') >= 0) ? '${EXTERNAL_LOCALYTICS_ID}' : '${INTERNAL_LOCALYTICS_ID}';  }
      +function(l,y,t,i,c,s) {
              l['LocalyticsGlobal'] = i;
              l[i] = function() { (l[i].q = l[i].q || []).push(arguments) };
              l[i].t = +new Date;
              (s = y.createElement(t)).type = 'text/javascript';
              s.src = '//web.localytics.com/v3/localytics.min.js';
              (c = y.getElementsByTagName(t)[0]).parentNode.insertBefore(s, c);
              ll('init', getLLId(), {} /* Options */);
          }(window, document, 'script', 'll');
      `
    }} />;
  }

  renderStyles() {
    let styles = [
      { href: '/assets/styles/slds.css' }
    ];
    if (this.props.siteStyles === true) {
      styles.push({ href: '/assets/styles/site.css' });
    }
    return styles.concat(this.props.styles).map((style, index) => {
      if (style.href) {
        return <link key={index} type="text/css" rel="stylesheet" href={style.href} />;
      }
      if (style.content) {
        return <style dangerouslySetInnerHTML={{__html: style.content}} />;
      }
    });
  }

  renderBody() {
    return (
      <body>
        <div id="app" />
        {this.renderScripts()}
      </body>
    );
  }

  renderScripts() {
    const scripts = [
      { src: '/assets/scripts/vendor.js' },
      { src: '/assets/scripts/common.js' },
      { src: '/assets/scripts/site.js' }
    ];
    return scripts.concat(this.props.scripts).map((script, index) => {
      const props = { key: index };
      if (script.src) props.src = script.src;
      if (script.content) props.dangerouslySetInnerHTML = {__html: script.content};
      return <script {...props} />;
    });
  }

}

Page.defaultProps = {
  title: globals.displayName,
  styles: [],
  scripts: [],
  siteStyles: true
};

Page.propTypes = {
  title: React.PropTypes.string,
  styles: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      href: React.PropTypes.string,
      content: React.PropTypes.string
    })
  ),
  siteStyles: React.PropTypes.bool,
  scripts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      src: React.PropTypes.string,
      content: React.PropTypes.string
    })
  )
};

module.exports = Page;
