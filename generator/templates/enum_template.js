{% extends 'base_template.js' %}
{% block typedef %}
/**
 {% if description is defined -%}
 {% for d in description -%}
 * {{d}}
 {% endfor -%}
 {% endif -%}
 * @typedef {{'%s%s%s %s'|format('{', extend, '}', name)}}
 * @property {Object} _MAP
 */
{%- endblock %}
{% block body %}
    /**
     * Constructor for {{name}}.
     * @class
     {%- if since is defined and since is not none %}
     {% if deprecated is defined and deprecated is not none -%}
     * @since SmartDeviceLink {{history[0].since}}
     * @deprecated in SmartDeviceLink {{since}}
     {%- elif history is defined and history is not none %}
     * @since SmartDeviceLink {{history[0].since}}
     {%- else -%}
     * @since SmartDeviceLink {{since}}
     {%- endif -%}
     {%- endif %}
     */
    constructor () {
        super();
    }
    {%- for method in methods %}

    /**
     * Get the enum value for {{method.method_title}}.
     {%- if method.since is defined and method.since is not none %}
     {% if method.deprecated is defined and method.deprecated is not none -%}
     * @since SmartDeviceLink {{method.history[0].since}}
     * @deprecated in SmartDeviceLink {{method.since}}
     {%- elif method.history is defined and method.history is not none %}
     * @since SmartDeviceLink {{method.history[0].since}}
     {%- else -%}
     * @since SmartDeviceLink {{method.since}}
     {%- endif -%}
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

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values({{name}}._MAP);
    }
{% endblock %}
{% block properties %}
{{name}}._MAP = Object.freeze({
{%- for param in params %}
    '{{param.key}}': {{param.value}},
{%- endfor %}
});
{%- endblock %}