# IE::Compat

Sick of reimplementing `console.log` every time you have to support Microsoft Internet Explorer < 10?

## Features

- `console` stubs
- JSON
- CSS3 selectors (via http://selectivizr.com)
- `Function.prototype.bind`
- `Array.prototype.forEach`


![⚠️ Done](http://cl.ly/image/272i1m2U0H0j/javascript-error-icon.gif)


## Installation

Add this line to your application's Gemfile:

    gem 'ie-compat'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install ie-compat

### Opal, Rails, Sprockets, ActiveAdmin

Happy days, got you covered!

(at least if they're required *before* `IE::Compat`)


### Everything Else

The base path of all the provided assets is available here:

```ruby
IE::Compat.assets_path
```


## Usage

### Rails

In your application layout add this line:

```erb
<%= ie_compat_tags =>
```

That will be translated into something like this:

```html
<!--[if lt IE 9]>
  <script src="/assets/ie-compat/lt-9-8df327478e15576a740b24b7f3f746af.js" type="text/javascript"></script>
<![endif]-->

<!--[if IE 9]>
  <script src="/assets/ie-compat/9-f7b8808e991e7cd9ee6c161d2c31473f.js" type="text/javascript"></script>
<![endif]-->
```


## Contributing

1. Fork it ( https://github.com/[my-github-username]/ie-compat/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
