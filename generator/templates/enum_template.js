{% extends 'base_template.js' %}
{% block typedef %}
/**
 {% if description is defined -%}
 {% for d in description -%}
 * {{d}}
 {% endfor -%}
 {% endif -%}
 {% if deprecated is defined -%}
 * @deprecated
 {% endif -%}
 * @typedef {{'%s%s%s %s'|format('{', extend, '}', name)}}
 * @property {Object} _MAP
 */
{%- endblock %}
{% block body %}
    /**
     * Constructor for {{name}}.
     * @class
     {%- if deprecated is defined %}
     * @deprecated
     {%- endif %}
     */
    constructor () {
        super();
    }
    {%- for method in methods %}

    /**
     * Get the enum value for {{method.method_title}}.
     {%- if method.deprecated is defined and method.deprecated %}
     * @deprecated
     {%- endif %}
     {%- for d in method.description %}
     * {{d}}
     {%- endfor %}
     * @returns {{'%s%s%s'|format('{', method.type, '}')}} - The enum value.
     */
    static get {{method.method_title}} () {
        return {{name}}._MAP.{{method.method_title}};
    }
    {%- endfor %}
{% if script is defined %}
{{script|indent(4,True)}}
{% endif %}
    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return {{name}}._valueForKey(key, {{name}}._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return {{name}}._keyForValue(value, {{name}}._MAP);
    }
{% endblock %}
{% block properties %}
{{name}}._MAP = Object.freeze({
{%- for param in params %}
    '{{param.key}}': {{param.value}},
{%- endfor %}
});
{%- endblock %}