require 'ie/compat/assets_path'

Sprockets.append_path IE::Compat.assets_path if defined? Sprockets
