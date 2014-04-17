module IE
  module Compat
    module ViewHelper
      def ie_compat_tags
        [
          "<!--[if lt IE 9]>#{javascript_include_tag 'ie-compat/lt-9'}<![endif]-->",
          "<!--[if IE 9]>   #{javascript_include_tag 'ie-compat/9'}   <![endif]-->",
        ].join("\n").html_safe
      end
    end
  end
end
