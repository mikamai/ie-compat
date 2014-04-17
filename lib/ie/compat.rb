require 'ie/compat/version'

module Ie
  module Compat
    IE_COMPAT_ASSETS_PATH = File.expand_path('../../../assets', __FILE__).freeze

    def ie_compat_assets_path
      IE_COMPAT_ASSETS_PATH
    end

    def self.assets_path
      IE_COMPAT_ASSETS_PATH
    end
  end
end

case
when defined? Rails
  require 'ie/compat/railtie'
when defined? Opal
  Opal.append_path IE::Compat.assets_path
when defined? Sprockets
  Sprockets.append_path IE::Compat.assets_path
end

