{% extends 'base_template.js' %}

{% block typedef %}
{%- if description is defined or deprecated is defined %}
/**
 {% if description is defined -%}
 {% for d in description -%}
 * {{d}}
 {% endfor -%}
 {% endif -%}
 {% if deprecated is defined -%}
 * @deprecated
 {% endif -%}
 */
{%- endif %}
{%- endblock %}
{% block body %}
    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     * @constructor
     */
{%- block constructor %}
{% endblock -%}
    {%- if script is defined %}
{{script|indent(4,True)}}
{% endif -%}
    {% for method in methods %}
    {% set len = method.type|length + method.param_name|length + 13 -%}
    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     {% if not method.description -%}
     * @param {{'%s%s%s %s'|format('{', method.type, '}', method.param_name)}}
     {% else -%}
     * {% for d in method.description -%}
     {% if loop.index == 1 -%}
     @param {{'%s%s%s %s - %s'|format('{', method.type, '}', method.param_name, d)}}
     {% else -%}
     * {{d|indent(len,True)}}
     {% endif -%} {% endfor -%}
     {% endif -%}
     * @return {{'%s%s%s'|format('{', name, '}')}}
     */
    set{{method.method_title}} ({{method.param_name}}) {
        {%- if method.external %}
        this.validateType({{method.external}}, {{method.param_name}}{{ ', true' if '[]' in method.type }});
        {%- endif %}
        this.setParameter({{name}}.{{method.key}}, {{method.param_name}});
        return this;
    }

    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     * @return {{'%s%s%s'|format('{', method.type, '}')}}
     */
    get{{method.method_title}} () {
        {%- if method.external %}
        return this.getObject({{method.external}}, {{name}}.{{method.key}});
        {%- else %}
        return this.getParameter({{name}}.{{method.key}});
        {%- endif %}
    }
{% endfor -%}
{%- endblock %}
{% block properties -%}
{% for param in params %}
{{name}}.{{param.key}} = {{param.value}};
{%- endfor %}
{%- endblock %}