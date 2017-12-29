NEJ.define([
    'base/element',
    'text!./app.html',
    'css!./app.css'
], function (
    e,
    html,
    css
) {

    var util = {
        extend: function (o1, o2, override, hasOwnProperty) {
            for (var i in o2) {
                if ((!hasOwnProperty || o2.hasOwnProperty(i)) &&
                    (override || o1[i] === undefined)) {
                    o1[i] = o2[i];
                }
            }
            return o1;
        }
    }

    var Component = Regular.extend({
        /**
         * 模板编译前用来初始化参数
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#config
         * @returns {void}
         */
        config: function () {
            // active css text
            e._$dumpCSSText();
            // set default value
            util.extend(this.data, {
                /**
                 * 是否可见
                 *
                 * @member {Boolean}  module:pool/component-base/src/base.Component#visible
                 */
                visible: true
            });
            // ensure use component options first
            this.supr();
        },

        /**
         * 模板编译之后(即活动dom已经产生)被调用, 可以在这里处理一些与dom相关的逻辑
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#init
         * @returns {void}
         */
        init: function () {
            this.supr();
        },

        /**
         * 组件销毁策略
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#destroy
         * @returns {void}
         */
        destroy: function () {
            this.supr();
        },
    })

    /**
     * 组件扩展方法
     *
     * @example
     *
     * @method  module:pool/component-base/src/base.Component.$extends
     * @param   {Object} options          - 配置信息
     * @param   {String} options.name     - 组件标签名称
     * @param   {String} options.css      - 组件的样式表
     * @param   {String} options.template - 组件的HTML结构
     * @returns {module:pool/component-base/src/base.Component} 组件类
     */
    Component.$extends = function ext(options) {
        // cache css text
        if (typeof options.css === 'string') {
            var css = options.css.trim();
            if (!!css) {
                e._$pushCSSText(options.css);
            }
            delete options.css;
        }
        // delegate extends api
        var Comp = this.extend(options);
        Comp.$extends = ext;
        return Comp;
    };

    return Component.$extends({
        name: 'App',
        css: css,
        template: html
    });
});