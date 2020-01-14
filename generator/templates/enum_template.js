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
     {%- if deprecated is defined %}
     * @deprecated
     {%- endif %}
     * @constructor
     */
    constructor () {
        super();
    }
    {%- for e in methods %}

    /**
     {%- if deprecated is defined %}
     * @deprecated
     {%- endif %}
     {%- for d in e.description %}
     * {{d}}
     {%- endfor %}
     * @return {{'%s%s%s'|format('{', e.type, '}')}}
     */
    static get {{e.method_title}} () {
        return {{name}}._MAP.{{e.method_title}};
    }
    {%- endfor %}
{% if scripts is defined -%}
    {%- for s in scripts %}
{{s|indent(4,True)}}
    {%- endfor %}
{% endif %}
    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return {{name}}._valueForKey(key, {{name}}._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return {{name}}._keyForValue(value, {{name}}._MAP);
    }
{% endblock %}
{% block properties %}
{{name}}._MAP = Object.freeze({
{%- for e in params %}
    '{{e.key}}': {{e.value}},
{%- endfor %}
});
{%- endblock %}