# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ie/compat/version'

Gem::Specification.new do |spec|
  spec.name          = 'ie-compat'
  spec.version       = IE::Compat::VERSION
  spec.authors       = ['Elia Schito']
  spec.email         = ['elia@schito.me']
  spec.summary       = %q{The usual set of IE 9 and <9 compatibility assets}
  spec.description   = %q{Sick of reimplementing `console.log` every time you have to support Microsoft Internet Explorer < 10?}
  spec.homepage      = 'https://github.com/mikamai/ie-compat#readme'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.6'
  spec.add_development_dependency 'rake'
end
